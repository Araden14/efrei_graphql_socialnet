import { Resolvers } from "../../types.js";
import { Context } from "../../context.js";
import db from "../../db.js";



export const LikeResolver: Resolvers['GraphQLLike'] = {
    user: async ({ userId }, _, { user, dataSources: { db } }: Context) => {
        if (!user) {
            throw new Error('Unauthenticated access attempted');
        }
        
        const dbUser = await db.user.findUniqueOrThrow({
            where: { id: userId }
        });
        
        return {
            ...dbUser,
            createdAt: dbUser.createdAt.toISOString(),
            updatedAt: dbUser.updatedAt.toISOString()
        };
    },
    post: async ({ postId }, _, { user, dataSources: { db } }: Context) => {
        if (!user) {
            throw new Error('Unauthenticated access attempted');
        }
        
        const post = await db.post.findUniqueOrThrow({
            where: { id: postId }
        });
        
        return {
            ...post,
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString()
        };
    }
}; 