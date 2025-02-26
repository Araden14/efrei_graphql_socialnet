import { Resolvers } from "../../types";
import db from "../../db";
import { Context } from "../../context";

export const CommentResolver: Resolvers['GraphQLComment'] = {
    author: async ({author}, _, {dataSources: {db}}: Context) => {
        const user = await db.user.findUniqueOrThrow({where: {id: author.id}});
        return {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString()
        };
    },
    post: async ({post}, _, {dataSources: {db}}: Context) => {
        const post = await db.post.findUniqueOrThrow({where: {id: post.id}});
        return {
            ...post,
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString()
        };
    },  
}; 