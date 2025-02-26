import { hashPassword } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";
import db from "../../db.js";

export const createUser: NonNullable<MutationResolvers['createUser']> = async (_, {email, username, password}) => {
  try {
    const createdUser = await db.user.create({
      data: {
        email,
        name: username,
        password: await hashPassword(password)
      }
    })
  
    return {
      code: 201,
      success: true,
      message: `user ${username} has been created`,
      user: {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        createdAt: createdUser.createdAt.toDateString(),
        updatedAt: createdUser.updatedAt.toDateString()
      }
    }
  } catch (error) {
    return {
      code: 400,
      message: 'User has not been created : ' + (error as Error).message,
      success: false,
      user: null
    }
  }
}