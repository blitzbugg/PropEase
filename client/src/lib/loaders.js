import apiRequest from "./apiRequest"

export const singlePageLoader = async ({request, params}) => {

    const res = await apiRequest("/posts/" + params.id)
    return res.data;
    
}
export const listPageLoader = async ({request, params}) => {
   
    const query = request.url.split("?")[1]
    const url = query ? `/posts?${query}` : "/posts"
    const res = await apiRequest(url)

    console.log("ListPageLoader response:", res.data);  
    
    return res.data;
    
}
// In loaders.js
// In loaders.js
export const profilePageLoader = async ({ params }) => {
    const profile = await apiRequest("/users/profilePosts");
    const chats = await apiRequest("/chats");
  
    // Transform all chats data without grouping
    const transformedChats = chats.data?.map(chat => ({
      id: chat.id,
      name: chat.receiver.username,
      avatar: chat.receiver.avatar,
      lastMessage: chat.lastMessage || "No messages yet",
      timestamp: new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: chat.seenBy.includes(chat.receiver.id) ? 0 : 1,
      messages: [] // Will be fetched separately
    })) || [];
  
    return {
      profile: profile.data,
      chats: transformedChats,
      activeChatId: params?.chatId || null
    };
  }