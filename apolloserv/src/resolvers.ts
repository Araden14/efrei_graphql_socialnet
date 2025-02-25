import { PrismaClient } from '@prisma/client';
import { hashPassword } from './utils/hash.js';
const prisma = new PrismaClient();

export const resolvers = {
  Mutation: {
    register: async (
      _: void,
      { email, password, name }: { email: string; password: string; name?: string }
    ) => {
      // Hasher le mot de passe
      const hashedPassword = await hashPassword(password);

      // Créer l'utilisateur dans la base de données
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      // Retourner un message de succès ou un token JWT
      return `User created with ID: ${user.id}`;
    },
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