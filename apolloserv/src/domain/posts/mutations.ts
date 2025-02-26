import { MutationResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types.js";
import db from "../../db.js";
import { Context } from "../../context.js";
type PostMutations = WithRequired<MutationResolvers, 'createPost'>

const createPost: MutationResolvers['createPost'] = async (
  parent = {},
  args = { title: '', content: '' },
  context: Context
) => {
  try {
    if (!context.user) throw new Error('User is not provided, check your token')

    const createdPost = await db.post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: context.user.id
      },
      include: {
        author: true
      }
    })
  
    return {
      code: 201,
      message: 'post has been created',
      success: true,
      post: createdPost
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        code: 400,
        message: e.message,
        success: false,
        post: null
      }
    }
    return {
      code: 400,
      message: 'post has not been created',
      success: false,
      post: null
    }
  }
}

export const postMutations: PostMutations = { createPost }