import { hashPassword } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";
import { Context } from "../../context.js";
import db from "../../db.js";

export const createUser: NonNullable<MutationResolvers['createUser']> = async (_, {email, username, password}, context: Context) => {
  try {
    const createdUser = await db.user.create({
      data: {
        email,
        username,
        password: await hashPassword(password)
      }
    })
  
    return {
      code: 201,
      success: true,
      message: "User created successfully",
      user: createdUser
    };
  } catch (error) {
    return {
      code: 400,
      message: 'User has not been created : ' + (error as Error).message,
      success: false,
      user: null
    }
  }
}