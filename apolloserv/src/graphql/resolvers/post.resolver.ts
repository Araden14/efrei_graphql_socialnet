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