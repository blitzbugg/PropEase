import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../context/SocketContext";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (chatInfo) => {
    try {
      const res = await apiRequest("/chats/" + chatInfo.id);
      // Store both the API response data and the basic chat info
      setChat({
        ...res.data,
        id: chatInfo.id,
        name: chatInfo.name,
        avatar: chatInfo.avatar
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      e.target.reset();
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      socket.emit("sendMessage", {
        receiverId: chat.receiverId, // This should be the ID of the other user
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (error) {
        console.log("Error marking chat as read:", error);
      }
    };
    
    if (chat && socket) {
      // Define message handler
      const messageHandler = (data) => {
        console.log("Message received:", data);
        console.log("Current chat ID:", chat.id);
        
        // Convert IDs to strings to ensure consistent comparison
        const currentChatId = String(chat.id);
        const messageChatId = String(data.chatId);
        
        if (currentChatId === messageChatId) {
          console.log("Message belongs to current chat, updating...");
          setChat(prev => {
            // Make sure prev is not null before updating
            if (!prev) return prev;
            return { ...prev, messages: [...prev.messages, data] };
          });
          read();
        } else {
          console.log("Message for different chat:", messageChatId);
        }
      };
      
      // Add event listener
      socket.on("getMessage", messageHandler);
      
      // Clean up function
      return () => {
        socket.off("getMessage", messageHandler);
      };
    }
  }, [socket, chat]);

  return (
    <div className="flex h-[calc(100vh-100px)] border border-gray-200 rounded-lg overflow-hidden">
      {/* Messages sidebar */}
      <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto">
        <h1 className="p-4 text-xl font-bold border-b border-gray-200">Messages</h1>
        <div className="divide-y divide-gray-100">
          {chats?.map((c) => (
            <div
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                chat?.id === c.id ? "bg-white" : c.unread > 0 ? "bg-yellow-50" : "bg-white"
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
                {c.unread > 0 && (
                  <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {c.unread}
                  </span>
                )}
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
              onClick={() => setChat(null)}
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
            <h2 className="text-xl font-medium mb-2">Select a conversation</h2>
            <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;