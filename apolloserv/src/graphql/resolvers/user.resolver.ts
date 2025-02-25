import { hashPassword, comparePassword } from '../../utils/hash.js';
import { generateToken } from '../../utils/jwt.js';
import db from '../../db.js';
import { MutationRegisterArgs, MutationLoginArgs } from '../../types.js';

export const UserResolver = {
  Mutation: {
    register: async (
      _: void,
      { email, password, name }: { email: string; password: string; name?: string }
    ) => {
      // Hasher le mot de passe
      const hashedPassword = await hashPassword(password);

      // Créer l'utilisateur dans la base de données
      const user = await db.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      // Retourner un message de succès ou un token JWT
      return `User created with ID: ${user.id}`;
    },
    login: async (parent: any, args: MutationLoginArgs) => {
      // Trouver l'utilisateur par email
      const user = await db.user.findUnique({ where: { email: args.email } });
      if (!user) throw new Error('User not found');

      // Vérifier le mot de passe
      const isValid = await comparePassword(args.password, user.password);
      if (!isValid) throw new Error('Invalid password');

      // Générer un token JWT
      return generateToken(user);
    }
  },
  Query: {}
}