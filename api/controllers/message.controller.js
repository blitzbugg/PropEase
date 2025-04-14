import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.chatId;
    const text = req.body.text;
  
    // Validate message
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ message: "Message text is required!" });
    }
  
    if (text.length > 1000) {
      return res.status(400).json({ message: "Message too long (max 1000 chars)!" });
    }
  
    try {
      const chat = await prisma.chat.findUnique({
        where: {
          id: chatId,
          userIDs: {
            hasSome: [tokenUserId],
          },
        },
      });
  
      if (!chat) {
        return res.status(404).json({ message: "Chat not found!" });
      }
  
      const message = await prisma.message.create({
        data: {
          text: text.trim(),
          chatId,
          userId: tokenUserId,
        },
      });
  
      // Update chat with new message and seen status
      await prisma.chat.update({
        where: { id: chatId },
        data: {
          lastMessage: text.trim(),
          seenBy: {
            set: [tokenUserId], // Only mark as seen by sender
          },
        },
      });
  
      res.status(200).json(message);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to add message!" });
    }
  }

