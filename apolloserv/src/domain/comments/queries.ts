import { QueryResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types.js";
import db from "../../db.js";
import { Context } from "../../context.js";

type CommentQueries = WithRequired<QueryResolvers, 'getComment'>

export const commentQueries: CommentQueries = { 
  getComment: async (
    _: any, 
    { id }: { id: number }, 
    { user, dataSources: { db } }: Context
  ) => {
    try {
      if (!user) {
        console.error('Unauthenticated user trying to access comment');
        return null;
      }
      
      const comment = await db.comment.findFirstOrThrow({
        where: { id }
      });

      return comment;
    } catch {
      console.error('Comment not found');
      return null;
    }
  }
}