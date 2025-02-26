import { MutationResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types.js";
import db from "../../db.js";
import { Context } from "../../context.js";

type CommentMutations = WithRequired<
  MutationResolvers,
  'createComment' | 'updateComment' | 'deleteComment'
>;

const createComment: MutationResolvers['createComment'] = async (
  _,
  { content, postId },
  context: Context
) => {
  try {
    if (!context.user) throw new Error('User is not authenticated');

    const createdComment = await db.comment.create({
      data: {
        content,
        authorId: context.user.id,
        postId
      },
      include: { author: true, post: true }
    });

    return {
      code: 201,
      message: 'Comment created successfully',
      success: true,
      comment: createdComment
    };
  } catch (e) {
    return {
      code: 500,
      message: e instanceof Error ? e.message : 'Failed to create comment',
      success: false,
    };
  }
};

const updateComment: MutationResolvers['updateComment'] = async (
  _,
  { commentId, newContent },
  context: Context
) => {
  try {
    if (!context.user) throw new Error('User is not authenticated');

    const existingComment = await db.comment.findUnique({
      where: { id: commentId }
    });

    if (!existingComment) throw new Error('Comment not found');
    if (existingComment.authorId !== context.user.id) throw new Error('Unauthorized');

    const updatedComment = await db.comment.update({
      where: { id: commentId },
      data: { content: newContent },
      include: { author: true, post: true }
    });

    return {
      code: 200,
      message: 'Comment updated successfully',
      success: true,
      comment: updatedComment
    };
  } catch (e) {
    return {
      code: 500,
      message: e instanceof Error ? e.message : 'Failed to update comment',
      success: false,
    };
  }
};

const deleteComment: MutationResolvers['deleteComment'] = async (
  _,
  { commentId },
  context: Context
) => {
  try {
    if (!context.user) throw new Error('User is not authenticated');

    const existingComment = await db.comment.findUnique({
      where: { id: commentId },
      include: { author: true, post: true }
    });

    if (!existingComment) throw new Error('Comment not found');
    if (existingComment.authorId !== context.user.id) throw new Error('Unauthorized');

    await db.comment.delete({
      where: { id: commentId },
      include: { author: true, post: true }
    });

    return {
      code: 200,
      message: 'Comment deleted successfully',
      success: true,
      comment: existingComment
    };
  } catch (e) {
    return {
      code: 500,
      message: e instanceof Error ? e.message : 'Failed to delete comment',
      success: false,
    };
  }
};

export const commentMutations: CommentMutations = {
  createComment,
  updateComment,
  deleteComment
};