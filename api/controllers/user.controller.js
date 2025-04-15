import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    console.log("It works!");
    
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get users!" });
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        res.status(200).json(user);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get user!" });
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const {password, avatar, ...inputs} = req.body;

    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not authorized" });
    }

    let updatedPassword = null;
    try {

        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar }),
            }
        });

        const { password:userPassword, ...rest } = updatedUser;
        res.status(200).json(rest);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update user!" });
    }
}

export const deleteUser = async (req, res) => {

    const id = req.params.id;
    const tokenUserId = req.userId;

    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not authorized" });
    }
    try {
        await prisma.user.delete({
            where: { id },
        });
        res.status(200).json({ message: "User has been deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete user!" });
    }
}
export const savePost = async (req, res) => {
    const { postId } = req.body;
    const tokenUserId = req.userId;

    try {
        // First verify the post exists
        const postExists = await prisma.post.findUnique({
            where: { id: postId }
        });
        
        if (!postExists) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if already saved - using findFirst for MongoDB
        const savedPost = await prisma.savedPost.findFirst({
            where: {
                userId: tokenUserId,
                postId: postId
            }
        });

        if (savedPost) {
            await prisma.savedPost.delete({
                where: {
                    id: savedPost.id
                }
            });
            return res.status(200).json({ message: "Post unsaved successfully" });
        } else {
            await prisma.savedPost.create({
                data: {
                    userId: tokenUserId,
                    postId: postId
                }
            });
            return res.status(200).json({ message: "Post saved successfully" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to save post" });
    }
}

// In user.controller.js
export const profilePosts = async (req, res) => {
    const tokenUserId = req.userId; // Changed from req.params.userId to req.userId
    try {
        const userPosts = await prisma.post.findMany({
            where: { userId: tokenUserId },
        });
        const saved = await prisma.savedPost.findMany({ // Changed from savePost to savedPost
            where: { userId: tokenUserId },
            include: { post: true },
        });

        const savedPosts = saved.map((item) => item.post);
        res.status(200).json({userPosts, savedPosts});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get profilePosts!" });
    }
}

export const getNotificationNumber = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const number = await prisma.chat.count({
            where: {
                userIDs: {
                    hasSome: [tokenUserId],
                },
                NOT: {
                    seenBy: {
                        hasSome: [tokenUserId], // Wrap in array
                    },
                }
            }
        });

        res.status(200).json(number);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get notification count!" });
    }
}