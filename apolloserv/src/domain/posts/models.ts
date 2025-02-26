import { GraphQlComment } from './../../types';
import { Resolvers } from "../../types.js"
import { Post } from ".prisma/client"
import db from "../../db.js"

export const PostResolver: Resolvers['GraphQLPost'] = {
    author: async ({author}, _, {dataSources: {db}}) => {
        const user = await db.user.findUniqueOrThrow({where: {id: author.id}});
        return {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString()
        };
    },
    comments: async ({id}, _, {dataSources: {db}}) => {
        const comments = await db.comment.findMany({where: {postId: id}});
        return comments.map(comment => ({
            ...comment,
            createdAt: comment.createdAt.toISOString(),
            updatedAt: comment.updatedAt.toISOString()
        }));
    },
    likes: async ({id}, _, {dataSources: {db}}) => {
        const likes = await db.like.findMany({where: {postId: id}});
        return likes.map(like => ({
            ...like,
            createdAt: like.createdAt.toISOString(),
            updatedAt: like.updatedAt.toISOString()
        }));
    }
}