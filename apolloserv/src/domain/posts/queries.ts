import { QueryResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types.js";
import { Context } from "../../context.js";
import db from "../../db.js";
import { Post } from "@prisma/client";
type PostQueries = WithRequired<QueryResolvers, 'fetchPosts'>

export const postQueries: PostQueries = { 
  fetchPosts: async (parent = {}, args = {}, context: Context) => {
    try {
      return await context.dataSources.db.post.findMany()
    } catch {
      console.error('posts not found')
      return []
    }
  }
}