import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {

    const tokenUserId = req.userId;
    
    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenUserId],
                }
            }
        });

        for(const chat of chats) {
            const receiverId = chat.userIDs.find(id => id !== tokenUserId);

            const receiver = await prisma.user.findUnique({
                where: {
                    id: receiverId,
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                }
            });
            chat.receiver = receiver;
        }
        res.status(200).json(chats);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get chats!" });
    }
}

export const findOrCreateChat = async (req, res) => {
    const tokenUserId = req.userId;
    const { receiverId } = req.body;

    try {
        // Modified query to ensure both users are in the chat
        const existingChat = await prisma.chat.findFirst({
            where: {
                AND: [
                    {
                        userIDs: {
                            has: tokenUserId
                        }
                    },
                    {
                        userIDs: {
                            has: receiverId
                        }
                    }
                ]
            }
        });

        if (existingChat) {
            return res.status(200).json(existingChat);
        }

        // If no chat exists, create a new one
        const newChat = await prisma.chat.create({
            data: {
                userIDs: [tokenUserId, receiverId],
            }
        });

        // Update both users' chatIDs
        await prisma.user.update({
            where: { id: tokenUserId },
            data: {
                chatIDs: {
                    push: newChat.id
                }
            }
        });

        await prisma.user.update({
            where: { id: receiverId },
            data: {
                chatIDs: {
                    push: newChat.id
                }
            }
        });

        res.status(200).json(newChat);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to find or create chat!" });
    }
}

export const getChat = async (req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.id;
    
    console.log("Getting chat with ID:", chatId);
    console.log("For user ID:", tokenUserId);
    
    try {
      // First get the chat
      const chat = await prisma.chat.findUnique({
        where: {
          id: chatId,
          userIDs: {
            hasSome: [tokenUserId],
          },
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
  
      console.log("Found chat:", chat);
  
      if (!chat) {
        console.log("Chat not found!");
        return res.status(404).json({ message: "Chat not found!" });
      }
  
      // Get receiver info
      const receiverId = chat.userIDs.find(id => id !== tokenUserId);
      const receiver = await prisma.user.findUnique({
        where: { id: receiverId },
        select: {
          id: true,
          username: true,
          avatar: true,
        }
      });
  
      console.log("Found receiver:", receiver);
  
      // Update seenBy only if not already seen
      if (!chat.seenBy.includes(tokenUserId)) {
        await prisma.chat.update({
          where: { id: chatId },
          data: {
            seenBy: {
              push: tokenUserId,
            },
          },
        });
      }
  
      // Add receiver info to the chat object
      const chatWithReceiver = {
        ...chat,
        receiver: receiver
      };
  
      console.log("Returning chat with receiver:", chatWithReceiver);
      res.status(200).json(chatWithReceiver);
    } catch (err) {
      console.error("Error in getChat:", err);
      res.status(500).json({ message: "Failed to get chat!" });
    }
  }

export const addChat = async (req, res) => {

    const tokenUserId = req.userId;
    
    try {
        const newChat = await prisma.chat.create({
            data: {
                userIDs: [tokenUserId, req.body.receiverId],
            }
        })
        res.status(200).json(newChat);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to add chat!" });
    }
}

export const readChat = async (req, res) => {
    const tokenUserId = req.userId;
    
    try {
      const chat = await prisma.chat.findUnique({
        where: {
          id: req.params.id,
          userIDs: {
            hasSome: [tokenUserId],
          },
        },
      });
  
      if (!chat) {
        return res.status(404).json({ message: "Chat not found!" });
      }
  
      // Only update if not already seen
      if (!chat.seenBy.includes(tokenUserId)) {
        const updatedChat = await prisma.chat.update({
          where: { id: req.params.id },
          data: {
            seenBy: {
              push: tokenUserId,
            },
          },
        });
        return res.status(200).json(updatedChat);
      }
  
      res.status(200).json(chat);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to read chat!" });
    }
  }