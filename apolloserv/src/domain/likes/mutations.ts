import { MutationResolvers } from "../../types.js";
import { Context } from "../../context.js";
import db from "../../db.js";

export const likeMutations: MutationResolvers = {
    likePost: async (parent = {}, { postId }, context: Context) => {
        if (!context.user) {
            return {
                code: 401,
                success: false,
                message: "Unauthenticated",
            };
        }

        try {
            const like = await db.like.create({
                data: {
                    userId: context.user.id,
                    postId: postId
                },
                include: {
                    user: true,
                    post: true
                }
            });

            return {
                code: 201,
                success: true,
                message: "Post liked successfully",
                like: like
            };
        } catch (error) {
            console.error("Error liking post:", error);
            return {
                code: 500,
                success: false,
                message: "Failed to like post",
            };
        }
    },
    
    unlikePost: async (parent = {}, { postId }, context: Context) => {
        if (!context.user) {
            return {
                code: 401,
                success: false,
                message: "Unauthenticated",
            };
        }

        try {
            const existingLike = await db.like.findFirstOrThrow({
                where: {
                    userId: context.user.id,
                    postId: postId
                }
            });

            const like = await db.like.delete({
                where: { id: existingLike.id },
                include: {
                    user: true,
                    post: true
                }
            });

            return {
                code: 200,
                success: true,
                message: "Post unliked successfully",
                like: like
            };
        } catch (error) {
            console.error("Error unliking post:", error);
            return {
                code: 500,
                success: false,
                message: "Failed to unlike post",
            };
        }
    }
};
