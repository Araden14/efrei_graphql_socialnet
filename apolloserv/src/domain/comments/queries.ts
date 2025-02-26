import { QueryResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types.js";
import { Context } from "../../context.js";

type CommentQueries = WithRequired<QueryResolvers, 'fetchComments' | 'fetchCommentsByUser' | 'fetchCommentsByPost'>

export const commentQueries: CommentQueries = {
  fetchComments: async (parent = {}, args = {}, context: Context) => {
    try {
      if (!context.user) {
        console.error('Unauthenticated user trying to access comment');
        return [];
      }

      return await context.dataSources.db.comment.findMany({
        include: {
          post: true,
          author: true,
        },
      });
    } catch (error) {
      console.error('Comments not found', error);
      return [];
    }
  },
  fetchCommentsByUser: async (parent = {}, args = {}, context: Context) => {
    try {
      return await context.dataSources.db.comment.findMany({
        where: { authorId: context.user?.id },
        include: {
          post: true,
          author: true,
        },
      });
    } catch (error) {
      console.error('Comments not found', error);
      return [];
    }
  },
  fetchCommentsByPost: async (parent = {}, args = {postId : 0}, context: Context) => {
    try {
      return await context.dataSources.db.comment.findMany({
        where: { postId: args.postId },
        include: {
          post: true,
          author: true,
        },
      });
    } catch (error) {
      console.error('Comments not found', error);
      return [];
    }
  }
};