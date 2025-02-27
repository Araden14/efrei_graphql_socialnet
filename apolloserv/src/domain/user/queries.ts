import { QueryResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types.js";
import { Context } from "../../context.js";
import db from "../../db.js";
import { User } from "@prisma/client";
import { AuthenticatedUser } from "../../modules/auth.js";
import jwt from "jsonwebtoken";
type UserQueries = WithRequired<QueryResolvers, 'verifyUser'>

export const userQueries: UserQueries = { 
  verifyUser: async (parent = {}, { token }: { token: string }, context: Context) => {
    try {
    const payload =  jwt.verify(token, process.env.JWT_SECRET as string) as AuthenticatedUser
    const user = await db.user.findUnique({
      where: {
        id: payload.id
      }
    })

      if (!payload || !user) {
        return {
          code: 401,
          success: false,
          message: 'unauthorized',
        }
      }

      return {
        code: 200,
        success: true,
        message: 'user verified',
        user: user
      }
    } catch (e) {
      return {
        code: 401,
        success: false,
        message: (e as Error).message,
      }
    }
  }
}