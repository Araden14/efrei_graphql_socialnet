import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, name: user.name },
    process.env.JWT_SECRET as string
  );
  return token;
};
 
export type AuthenticatedUser = Pick<User, 'id' | 'name'>
 
export const getUser = (token: string): AuthenticatedUser | null => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthenticatedUser
    return payload;
  } catch {
    return null
  }
}

export const comparePasswords = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
  };
   
export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 5);
  };
  