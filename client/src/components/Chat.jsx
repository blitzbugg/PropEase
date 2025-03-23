import React, { useState } from 'react';
import { contacts, messages } from '../lib/dummydata';
function Chat() {
  // Sample data for contacts
  

  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  return (
    <div className="h-auto flex flex-col bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 bg-white border-b shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">Messages</h2>
      </div>

      {/* Contacts List */}
      <div className="overflow-y-auto h-auto">
        {contacts.map((contact) => (
          <div 
            key={contact.id}
            onClick={() => setSelectedContact(contact)}
            className={`flex items-center gap-2 py-2 px-3 border-b cursor-pointer hover:bg-gray-100 transition-colors ${selectedContact.id === contact.id ? 'bg-gray-100' : ''}`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src={contact.avatar} 
                  alt={contact.name} 
                />
              </div>
              {contact.unread > 0 && (
                <div className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {contact.unread}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-900 text-sm truncate">{contact.name}</h3>
                <span className="text-xs text-gray-500">{contact.timestamp}</span>
              </div>
              <p className="text-xs text-gray-600 truncate">{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="bg-indigo-600 h-1"></div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 min-h-96"> {/* Use flex-1 to fill remaining space */}
        {/* Chat Header */}
        <div className="px-3 py-2 bg-white border-b flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              src={selectedContact.avatar} 
              alt={selectedContact.name} 
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-gray-900">{selectedContact.name}</h3>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-100">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] ${message.isOwn ? 'bg-indigo-600 text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl' : 'bg-white rounded-tl-xl rounded-tr-xl rounded-br-xl'} p-2 shadow-sm`}>
                <p className={`text-xs ${message.isOwn ? 'text-white' : 'text-gray-800'}`}>{message.content}</p>
                <div className={`text-xs mt-1 ${message.isOwn ? 'text-indigo-200' : 'text-gray-500'} text-right`}>
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="px-2 py-2 bg-white border-t">
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 border rounded-full py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="p-1 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;