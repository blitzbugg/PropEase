import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
    const query = req.query;

    const filters = {
        where: {
            city: query.city || undefined,
            type: query.type || undefined,
            property: query.property || undefined,
            bedroom: query.bedroom ? parseInt(query.bedroom) : undefined,
            price: {
                gte: query.minPrice ? parseInt(query.minPrice) : 0,
                lte: query.maxPrice ? parseInt(query.maxPrice) : 10000000,
            },
        },
    };

    try {
        const posts = await prisma.post.findMany(filters);
        res.status(200).json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ message: "Failed to get posts" });
    }
};

export const getPost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId; // Get the user ID from the token

    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    }
                }
            }
        });

        // Check if post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has saved this post
        let isSaved = false;
        if (tokenUserId) {
            const savedPost = await prisma.savePost.findUnique({
                where: {
                    userId_postId: {
                        userId: tokenUserId,
                        postId: id,
                    }
                }
            });
            isSaved = !!savedPost;
        }

        res.status(200).json({
            ...post,
            isSaved // Add the isSaved flag to the response
        });
        // console.log("Post fetched successfully:", post);
        // console.log(isSaved);
        
        
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
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail,
                },
            }
        });
        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating post" });
    }
}

export const updatePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { postData, postDetail } = req.body;

    try {
        const existingPost = await prisma.post.findUnique({
            where: { id }
        });

        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (existingPost.userId !== tokenUserId) {
            return res.status(403).json({ message: "You are not authorized to update this post" });
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                ...postData,
                postDetail: {
                    update: postDetail
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
            where: { id },
            include: { postDetail: true }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

        if (post.postDetail) {
            await prisma.postDetail.delete({
                where: { postId: id }
            });
        }

        await prisma.post.delete({
            where: { id }
        });

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting post" });
    }
};