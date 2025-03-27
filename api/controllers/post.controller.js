import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
    try {

        const posts = await prisma.post.findMany()

        res.status(200).json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error getting posts" });
    }
}
export const getPost = async (req, res) => {

    const id = req.params.id;
    try {

        const post = await prisma.post.findUnique({
            where: {id},
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    }
                }
            }
        })
        res.status(200).json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error getting post" });
    }
}
export const addPost = async (req, res) => {

    const body = req.body;
    const tokenUserId = req.userId;
    try {
        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                UserId : tokenUserId,
                postDetail: {
                    create: body.postDetail,
                },
            }
        })

        res.status(200).json(newPost)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error create post" });
    }
}
export const updatePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { postData, postDetail } = req.body; // Extract postData and postDetail separately

    try {
        // Check if the post exists and belongs to the authenticated user
        const existingPost = await prisma.post.findUnique({
            where: { id }
        });

        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (existingPost.UserId !== tokenUserId) {
            return res.status(403).json({ message: "You are not authorized to update this post" });
        }

        // Update post details
        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                ...postData, // Update post main details
                postDetail: {
                    update: postDetail // Update related post details
                }
            }
        });

        res.status(200).json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating post" });
    }
};


export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    try {
        
        const post = await prisma.post.findUnique({
            where: {id}
        })

        if (post.UserId !== tokenUserId) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

        await prisma.post.delete({
            where: {id}
        })
        res.status(200).json({ message: "Post deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting post" });
    }
}