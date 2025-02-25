import { Resolver, Mutation, Arg } from 'type-graphql';
import { PrismaClient, User } from '@prisma/client';
import { hashPassword, comparePassword } from '../../utils/hash';
import { generateToken } from '../../utils/jwt';

const prisma = new PrismaClient();

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('name') name: string
  ): Promise<string> {
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

    // Générer un token JWT
    return generateToken(user);
  }

  @Mutation(() => String)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<string> {
    // Trouver l'utilisateur par email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    // Vérifier le mot de passe
    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new Error('Invalid password');

    // Générer un token JWT
    return generateToken(user);
  }
}