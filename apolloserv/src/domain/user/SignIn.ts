import { comparePassword, createJWT } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";
import db from "../../db.js";
export const SignIn: NonNullable<MutationResolvers['SignIn']> = async (_, {email, username, password}, {dataSources}, __) => {
  try {
    const user = await db.user.findFirstOrThrow({where: {email}});
    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      throw new Error('Invalid password')
    }

    const jwtToken = createJWT(user)

    return {
      code: 200,
      message: 'user connected',
      success: true,
      token: jwtToken,
      email: user.email
    }

  } catch (e) {
    return {
      code: 401,
      message: (e as Error).message,
      success: false,
      token: null,
      email: null,
    }
  }
}