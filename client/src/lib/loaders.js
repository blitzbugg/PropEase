import apiRequest from "./apiRequest"

export const singlePageLoader = async ({request, params}) => {

    const res = await apiRequest("/posts/" + params.id)
    return res.data;
    
}
export const listPageLoader = async ({request, params}) => {
   
    const query = request.url.split("?")[1]
    const res = await apiRequest("/posts?" + query)

    console.log("ListPageLoader response:", res.data);  
    
    return res.data;
    
}
// In loaders.js
// In loaders.js
export const profilePageLoader = async () => {
    const profile = await apiRequest("/users/profilePosts");
    const chats = await apiRequest("/chats");
  
    // Group chats by receiver ID
    const chatsByReceiver = chats.data?.reduce((acc, chat) => {
      const receiverId = chat.receiver.id;
      
      // If we already have a chat with this receiver, update it
      if (acc[receiverId]) {
        // Keep the most recent chat
        if (new Date(chat.createdAt) > new Date(acc[receiverId].createdAt)) {
          acc[receiverId] = chat;
        }
      } else {
        acc[receiverId] = chat;
      }
      
      return acc;
    }, {});
  
    // Transform grouped chats data
    const transformedChats = Object.values(chatsByReceiver || {}).map(chat => ({
      id: chat.id,
      name: chat.receiver.username,
      avatar: chat.receiver.avatar,
      lastMessage: chat.lastMessage || "No messages yet",
      timestamp: new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: chat.seenBy.includes(chat.receiver.id) ? 0 : 1,
      messages: [] // Will be fetched separately
    }));
  
    return {
      profile: profile.data,
      chats: transformedChats
    };
  }