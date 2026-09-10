import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const url = query ? `/posts?${query}` : "/posts";
  const res = await apiRequest(url);
  return res.data;
};

export const profilePageLoader = async ({ params }) => {
  const profile = await apiRequest("/users/profilePosts");
  const chats = await apiRequest("/chats");

  // Transform chats data with receiverId and accurate unread status
  const transformedChats =
    chats.data?.map((chat) => ({
      id: chat.id,
      name: chat.receiver?.username || "User",
      avatar: chat.receiver?.avatar,
      receiverId: chat.receiverId || chat.receiver?.id,
      lastMessage: chat.lastMessage || "No messages yet",
      timestamp: new Date(chat.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      unread: chat.isSeen ? 0 : 1,
      messages: [],
    })) || [];

  return {
    profile: profile.data,
    chats: transformedChats,
    activeChatId: params?.chatId || null,
  };
};