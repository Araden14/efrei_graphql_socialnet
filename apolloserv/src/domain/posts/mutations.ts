import { MutationResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types.js";
import db from "../../db.js";
type PostMutations = WithRequired<MutationResolvers, 'createPost'>

const createPost: MutationResolvers['createPost'] = async (
  _,
  { title, content, authorId },
  { dataSources: { db }, user }
) => {
  try {
    if (!user) throw new Error('User is not provided')

    const createdPost = await db.post.create({
      data: {
        title,
        content,
        authorId: user.id
      }
    })
  
    return {
      code: 201,
      message: 'post has been created',
      success: true,
      post: {
        ...createdPost,
        createdAt: createdPost.createdAt.toISOString(),
        updatedAt: createdPost.updatedAt.toISOString(),
      }
    }
  } catch(e) {
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