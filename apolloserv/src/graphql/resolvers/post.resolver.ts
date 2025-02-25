// import { Resolver, Query, Mutation, Arg } from 'type-graphql';
// import { PrismaClient } from '@prisma/client';
// import { Post } from '../../types';

// const prisma = new PrismaClient();

// @Resolver(Post)
// export class PostResolver {
//   @Query(() => [Post])
//   async posts(): Promise<Post[]> {
//     return prisma.post.findMany();
//   }

//   @Mutation(() => Post)
//   async createPost(
//     @Arg('title') title: string,
//     @Arg('content') content: string,
//     @Arg('authorId') authorId: number
//   ): Promise<Post> {
//     return prisma.post.create({
//       data: { title, content, authorId },
//     });
//   }
// }

import prisma from '../../db.js';

export const PostResolver = {
  Mutation: {
    createPost: async (
      _: void,
      { title, content, authorId }: { title: string; content: string; authorId: number }
    ) => {
      // Vérifier si l'utilisateur existe
      const user = await prisma.user.findUnique({ where: { id: authorId } });
      if (!user) {
        throw new Error(`User with ID ${authorId} does not exist.`);
      }

      // Créer l'article
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId,
        },
      });
      return post;
    },
  },
  Query: {
    posts: async () => {
      return await prisma.post.findMany();
    },
  },
}; 