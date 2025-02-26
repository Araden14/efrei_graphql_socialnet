import { QueryResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types.js";

type PostQueries = WithRequired<QueryResolvers, 'posts'>

export const postQueries: PostQueries = { 
  posts: async (_, __, {dataSources: {db}}) => {
    try {
      return await db.post.findMany()
    } catch {
      console.error('posts not found')
      return null
    }
  }
}