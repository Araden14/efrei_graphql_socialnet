import { QueryResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types.js";
import { Context } from "../../context.js";

type LikeQueries = WithRequired<QueryResolvers, 'fetchLikes' | 'fetchLikesByUser'>

export const likeQueries: LikeQueries = {
  fetchLikes: async (parent = {}, args = {}, context: Context) => {
    try {
      return await context.dataSources.db.like.findMany({
        include: {
          post: true,
          user: true,
        },
      })
    } catch {
      console.error('likes not found')
      return []
    }
  },
  fetchLikesByUser: async (parent = {}, args = {}, context: Context) => {
    try {
      return await context.dataSources.db.like.findMany({
        where: { userId: context.user?.id },
        include: {
          post: true,
          user: true,
        },
      })
    } catch {
      console.error('likes not found')
      return []
    }
  }
}