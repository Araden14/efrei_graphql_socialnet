import { GraphQlComment } from './../../types';
import { Resolvers } from "../../types.js"
import { Post } from ".prisma/client"
import db from "../../db.js"
import { Context } from "../../context.js"

export const PostResolver: Resolvers['GraphQLPost'] = {
    author: async ({authorId}, _, {dataSources: {db}}: Context) => {
        const user = await db.user.findUniqueOrThrow({where: { id : authorId }});
        return {
            ...user,
        };
    },
    comments: async ({id}, _, {dataSources: {db}}: Context) => {
        const comments = await db.comment.findMany({
          where: { postId: id },
          include: {
            author: true,
            post: true
          }
        });
        return comments.map(comment => ({
            ...comment,
            createdAt: comment.createdAt.toISOString(),
            updatedAt: comment.updatedAt.toISOString()
        }));
    },
    likes: async ({id}, _, {dataSources: {db}}: Context) => {
        const likes = await db.like.findMany({
          where: { postId: id },
          include: {
            user: true,
            post: true
          }
        });
        return likes.map(like => ({
            ...like,
            createdAt: like.createdAt.toISOString(),
            updatedAt: like.updatedAt.toISOString()
        }));
    }
}