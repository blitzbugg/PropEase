import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../lib/notificationStore";

function Chat({ chats, initialChatId }) {
  const [localChats, setLocalChats] = useState(chats || []);
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const fetchNotifications = useNotificationStore((state) => state.fetch);
  const messageEndRef = useRef();
  const navigate = useNavigate();
  const [shouldScroll, setShouldScroll] = useState(true);

  // Synchronize localChats when chats prop changes
  useEffect(() => {
    if (chats) {
      setLocalChats(chats);
    }
  }, [chats]);

  // Smooth scroll to bottom on new messages
  useEffect(() => {
    if (shouldScroll && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages?.length, shouldScroll]);

  // Track if user has scrolled away from bottom
  useEffect(() => {
    const chatContainer = messageEndRef.current?.parentElement;

    const handleScroll = () => {
      if (chatContainer) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainer;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShouldScroll(isNearBottom);
      }
    };

    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
      return () => chatContainer.removeEventListener("scroll", handleScroll);
    }
  }, [chat]);

  // Open a specific conversation
  const handleOpenChat = async (chatInfo) => {
    if (loading) return;
    if (chat?.id === chatInfo.id) return;

    setLoading(true);
    try {
      const res = await apiRequest("/chats/" + chatInfo.id);

      navigate(`/profile/c/${chatInfo.id}`);

      const receiverId =
        chatInfo.receiverId ||
        res.data.receiverId ||
        res.data.receiver?.id ||
        res.data.userIDs?.find((id) => id !== currentUser.id);

      setChat({
        ...res.data,
        id: chatInfo.id,
        name: chatInfo.name || res.data.receiver?.username,
        avatar: chatInfo.avatar || res.data.receiver?.avatar,
        receiverId,
        unread: 0,
      });

      // Clear unread for this chat locally
      setLocalChats((prev) =>
        prev.map((c) => (c.id === chatInfo.id ? { ...c, unread: 0 } : c))
      );

      // Mark as read in backend
      await apiRequest.put("/chats/read/" + chatInfo.id);
      fetchNotifications();
    } catch (err) {
      console.error("Error opening chat:", err);
    } finally {
      setLoading(false);
    }
  };

  // Open initialChatId if supplied via route params
  useEffect(() => {
    if (initialChatId && localChats.length > 0 && !chat) {
      const initialChat = localChats.find((c) => c.id === initialChatId);
      if (initialChat) {
        handleOpenChat(initialChat);
      } else {
        // Chat ID was provided in URL but wasn't in list yet
        handleOpenChat({ id: initialChatId });
      }
    }
  }, [initialChatId, localChats]);

  // Real-time socket listener for incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = async (data) => {
      console.log("[Chat] Incoming socket message:", data);
      const incomingChatId = String(data.chatId);
      const isCurrentChatOpen = chat && String(chat.id) === incomingChatId;

      // 1. If this message belongs to currently open chat, append to messages
      if (isCurrentChatOpen) {
        setShouldScroll(true);
        setChat((prev) => {
          if (!prev) return prev;
          const exists = prev.messages?.some((m) => m.id === data.id);
          if (exists) return prev;
          return {
            ...prev,
            messages: [...(prev.messages || []), data],
            unread: 0,
          };
        });

        // Mark as read immediately on backend
        try {
          await apiRequest.put("/chats/read/" + incomingChatId);
        } catch (err) {
          console.error("Error marking chat read:", err);
        }
      }

      // 2. Update the sidebar conversation list in real time
      setLocalChats((prevChats) => {
        const chatIndex = prevChats.findIndex((c) => String(c.id) === incomingChatId);

        if (chatIndex !== -1) {
          const targetChat = prevChats[chatIndex];
          const updatedChat = {
            ...targetChat,
            lastMessage: data.text,
            timestamp: new Date(data.createdAt || Date.now()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            unread: isCurrentChatOpen ? 0 : (targetChat.unread || 0) + 1,
          };

          // Move updated chat to the top
          const otherChats = prevChats.filter((_, idx) => idx !== chatIndex);
          return [updatedChat, ...otherChats];
        } else {
          // If a new conversation was started, fetch full chats list
          apiRequest("/chats")
            .then((res) => {
              const transformed = res.data?.map((c) => ({
                id: c.id,
                name: c.receiver?.username || "User",
                avatar: c.receiver?.avatar,
                receiverId: c.receiverId || c.receiver?.id,
                lastMessage: c.lastMessage || "No messages yet",
                timestamp: new Date(c.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                unread: c.isSeen ? 0 : 1,
                messages: [],
              })) || [];
              setLocalChats(transformed);
            })
            .catch((err) => console.error(err));

          return prevChats;
        }
      });

      // Update global notification count
      fetchNotifications();
    };

    socket.on("getMessage", handleIncomingMessage);

    return () => {
      socket.off("getMessage", handleIncomingMessage);
    };
  }, [socket, chat, fetchNotifications]);

  // Send a new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text || text.trim() === "") return;

    const receiverId =
      chat.receiverId ||
      chat.receiver?.id ||
      chat.userIDs?.find((id) => id !== currentUser.id);

    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      e.target.reset();
      setShouldScroll(true);

      // Append sent message to open chat state
      setChat((prev) => ({
        ...prev,
        messages: [...(prev.messages || []), res.data],
      }));

      // Update sidebar conversation list
      setLocalChats((prevChats) => {
        const chatIndex = prevChats.findIndex((c) => c.id === chat.id);
        if (chatIndex !== -1) {
          const targetChat = prevChats[chatIndex];
          const updatedChat = {
            ...targetChat,
            lastMessage: res.data.text,
            timestamp: new Date(res.data.createdAt || Date.now()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          const otherChats = prevChats.filter((_, idx) => idx !== chatIndex);
          return [updatedChat, ...otherChats];
        }
        return prevChats;
      });

      // Emit to socket server so receiver gets it in real time
      if (receiverId) {
        socket?.emit("sendMessage", {
          receiverId,
          data: res.data,
        });
      } else {
        console.warn("[Chat] receiverId could not be determined:", chat);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Messages sidebar */}
      <div className="w-1/3 border-r border-slate-200 bg-white overflow-y-auto">
        <h1 className="p-4 text-lg font-bold text-slate-900 border-b border-slate-100">
          Conversations
        </h1>
        <div className="divide-y divide-slate-100">
          {localChats && localChats.length > 0 ? (
            localChats.map((c) => (
              <div
                className={`p-4 cursor-pointer transition-colors ${
                  chat?.id === c.id
                    ? "bg-emerald-50/60"
                    : c.unread > 0
                    ? "bg-slate-50"
                    : "hover:bg-slate-50"
                }`}
                key={c.id}
                onClick={() => handleOpenChat(c)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={c.avatar || "/noavatar.jpg"}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    {c.unread > 0 && (
                      <span className="absolute top-0 right-0 bg-emerald-500 text-white rounded-full min-w-[16px] h-4 px-1 text-[10px] font-bold flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                        {c.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-2">
                      <span
                        className={`font-semibold truncate ${
                          c.unread > 0 ? "text-slate-900" : "text-slate-700"
                        }`}
                      >
                        {c.name}
                      </span>
                      {c.timestamp && (
                        <span className="text-xs text-slate-400 flex-shrink-0">
                          {c.timestamp}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm truncate ${
                        c.unread > 0
                          ? "text-slate-700 font-medium"
                          : "text-slate-500"
                      }`}
                    >
                      {c.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-slate-400 text-sm">
              No conversations yet
            </div>
          )}
        </div>
      </div>

      {/* Chat box */}
      {chat ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat header */}
          <div className="flex justify-between items-center p-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <img
                src={chat.avatar || "/noavatar.jpg"}
                alt=""
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div>
                <span className="font-semibold text-slate-900">{chat.name}</span>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  Active Chat
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setChat(null);
                navigate("/profile");
              }}
              className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50/70">
            {chat.messages && chat.messages.length > 0 ? (
              <div className="space-y-4">
                {chat.messages.map((message) => {
                  const isCurrentUser = message.userId === currentUser.id;

                  return (
                    <div
                      key={message.id || message._id || Math.random()}
                      className={`flex flex-col max-w-[80%] ${
                        isCurrentUser
                          ? "ml-auto items-end"
                          : "mr-auto items-start"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 mb-1 ${
                          isCurrentUser ? "flex-row-reverse" : ""
                        }`}
                      >
                        <img
                          src={
                            (isCurrentUser
                              ? currentUser.avatar
                              : chat.avatar) || "/noavatar.jpg"
                          }
                          alt=""
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-slate-500 font-medium">
                          {isCurrentUser ? currentUser.username || "You" : chat.name}
                        </span>
                      </div>

                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                          isCurrentUser
                            ? "bg-emerald-600 text-white rounded-br-md"
                            : "bg-white border border-slate-200 text-slate-800 rounded-bl-md"
                        }`}
                      >
                        <p>{message.text}</p>
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1">
                        {message.createdAt ? format(message.createdAt) : "Just now"}
                      </span>
                    </div>
                  );
                })}
                <div ref={messageEndRef} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                Start a conversation with {chat.name}
              </div>
            )}
          </div>

          {/* Message input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-slate-200 bg-white"
          >
            <div className="flex gap-2">
              <textarea
                name="text"
                className="flex-1 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none text-sm text-slate-800 transition-all"
                rows="1"
                placeholder="Type a message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-semibold text-sm shadow-sm shadow-emerald-600/30 transition-all duration-200 flex items-center gap-2 active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-slate-50/70">
          <div className="text-center p-8">
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <span className="ml-2 text-slate-600">Loading chat...</span>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-800 mb-1">
                  Select a conversation
                </h2>
                <p className="text-slate-500 text-sm">
                  Choose a chat from the sidebar to start messaging in real time
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;