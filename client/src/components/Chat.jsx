import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

function Chat({ chats, initialChatId }) {
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef();
  const navigate = useNavigate();
  const [shouldScroll, setShouldScroll] = useState(true);

  useEffect(() => {
    if (shouldScroll && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages?.length, shouldScroll]);

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
      chatContainer.addEventListener('scroll', handleScroll);
      return () => chatContainer.removeEventListener('scroll', handleScroll);
    }
  }, [chat]);

  const handleOpenChat = async (chatInfo) => {
    if (loading) return;
    if (chat?.id === chatInfo.id) return;

    setLoading(true);
    try {
      console.log("Opening chat:", chatInfo);
      const res = await apiRequest("/chats/" + chatInfo.id);
      console.log("Chat API response:", res);
      
      navigate(`/profile/c/${chatInfo.id}`);
      
      setChat({
        ...res.data,
        id: chatInfo.id,
        name: chatInfo.name,
        avatar: chatInfo.avatar,
        unread: 0
      });

      await apiRequest.put("/chats/read/" + chatInfo.id);
      
    } catch (err) {
      console.error("Error opening chat:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialChatId && chats && !chat) {
      const initialChat = chats.find(c => c.id === initialChatId);
      if (initialChat) {
        handleOpenChat(initialChat);
      }
    }
  }, [initialChatId, chats]);

  useEffect(() => {
    if (chat && chats) {
      const updatedChats = chats.map(c => 
        c.id === chat.id ? { ...c, unread: 0 } : c
      );
    }
  }, [chat?.id]);

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (error) {
        console.log("Error marking chat as read:", error);
      }
    };
    
    if (chat && socket) {
      const messageHandler = (data) => {
        const currentChatId = String(chat.id);
        const messageChatId = String(data.chatId);
        
        if (currentChatId === messageChatId) {
          setShouldScroll(true);
          setChat(prev => {
            if (!prev) return prev;
            return { 
              ...prev, 
              messages: [...prev.messages, data],
              unread: 0
            };
          });
          read();
        }
      };
      
      socket.on("getMessage", messageHandler);
      return () => socket.off("getMessage", messageHandler);
    }
  }, [socket, chat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      e.target.reset();
      setShouldScroll(true);
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      socket.emit("sendMessage", {
        receiverId: chat.receiverId,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] border border-gray-200 rounded-lg overflow-hidden">
      {/* Messages sidebar */}
      <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto">
        <h1 className="p-4 text-xl font-bold border-b border-gray-200">Messages</h1>
        <div className="divide-y divide-gray-100">
          {chats?.map((c) => (
            <div
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                chat?.id === c.id 
                  ? "bg-blue-50" 
                  : c.unread > 0 
                    ? "bg-yellow-50" 
                    : "bg-white"
              }`}
              key={c.id}
              onClick={() => handleOpenChat(c)}
            >
              <div className="flex items-center gap-3">
                <img 
                  src={c.avatar || "/noavatar.jpg"} 
                  alt="" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium truncate">{c.name}</span>
                    {c.timestamp && (
                      <span className="text-xs text-gray-500">{c.timestamp}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{c.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat box */}
      {chat ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img 
                src={chat.avatar || "/noavatar.jpg"} 
                alt="" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium">{chat.name}</span>
            </div>
            <button 
              onClick={() => {
                setChat(null);
                navigate('/profile');
              }}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {chat.messages && chat.messages.length > 0 ? (
              <div className="space-y-4">
                {chat.messages.map((message) => {
                  const isCurrentUser = message.userId === currentUser.id;
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex flex-col max-w-[80%] ${
                        isCurrentUser 
                          ? "ml-auto items-end" 
                          : "mr-auto items-start"
                      }`}
                    >
                      {/* Add sender info above each message */}
                      <div className="flex items-center gap-2 mb-1">
                        <img 
                          src={(isCurrentUser ? currentUser.avatar : chat.avatar) || "/noavatar.jpg"} 
                          alt="" 
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-gray-600 font-medium">
                          {isCurrentUser ? currentUser.name : chat.name}
                        </span>
                      </div>
                      
                      <div className={`px-4 py-2 rounded-lg ${
                        isCurrentUser
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-white border border-gray-200 rounded-bl-none"
                      }`}>
                        <p>{message.text}</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {format(message.createdAt)}
                      </span>
                    </div>
                  );
                })}
                <div ref={messageEndRef} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Start a conversation with {chat.name}
              </div>
            )}
          </div>

          {/* Message input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <textarea
                name="text"
                className="flex-1 border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="1"
                placeholder="Type a message..."
              />
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2">Loading chat...</span>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-medium mb-2">Select a conversation</h2>
                <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;