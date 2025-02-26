import { User } from "@prisma/client";
import jwt from 'jsonwebtoken'
import * as bcrypt from "bcrypt";

export const createJWT = (user: User) => {
  const token = jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
  }, process.env.JWT_SECRET as string, { expiresIn: '24h' })

  return token
}

export type AuthenticatedUser = Pick<User, 'id' | 'email' | 'username'>

export const getUser = (token: string): AuthenticatedUser | null => {
  try {
    const payload =  jwt.verify(token, process.env.JWT_SECRET as string) as AuthenticatedUser
    return payload
  } catch {
    return null
  }
}

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5)
}