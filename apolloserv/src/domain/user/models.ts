import { Resolvers } from "../../types";
import db from "../../db";

export const UserResolver: Resolvers['GraphQLUser'] = {
    comments: async ({id}, _, {dataSources: {db}}) => {
        const comments = await db.comment.findMany({where: {authorId: id}});
        return comments.map((c: any) => ({...c, createdAt: c.createdAt.toISOString()}));
    },
    likes: async ({id}, _, {dataSources: {db}}) => {
        const likes = await db.like.findMany({where: {userId: id}});
        return likes.map((l: any) => ({...l, createdAt: l.createdAt.toISOString()}));
    },
    posts: async ({id}, _, {dataSources: {db}}) => {
        const posts = await db.post.findMany({where: {authorId: id}});
        return posts.map((p: any) => ({...p, createdAt: p.createdAt.toISOString()}));
    }
}; 