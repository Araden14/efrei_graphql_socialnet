import { MutationResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types.js";
import db from "../../db.js";
import { Context } from "../../context.js";
type PostMutations = WithRequired<
  MutationResolvers, 
  'createPost' | 'updatePost' | 'deletePost'
>;

const createPost: MutationResolvers['createPost'] = async (
  _,
  { title, content },
  context: Context
) => {
  try {
    if (!context.user) throw new Error('User is not authenticated');

    const createdPost = await db.post.create({
      data: {
        title,
        content,
        authorId: context.user.id
      },
      include: { author: true }
    });

    return {
      code: 201,
      message: 'Post created successfully',
      success: true,
      post: createdPost
    };
  } catch (e) {
    return {
      code: 500,
      message: e instanceof Error ? e.message : 'Failed to create post',
      success: false,
      post: null
    };
  }
};

const updatePost: MutationResolvers['updatePost'] = async (
  _,
  { postId, newTitle, newContent },
  context: Context
) => {
  try {
    if (!context.user) throw new Error('User is not authenticated');

    const existingPost = await db.post.findUnique({
      where: { id: postId }
    });

    if (!existingPost) throw new Error('Post not found');
    if (existingPost.authorId !== context.user.id) throw new Error('Unauthorized');

    const updatedPost = await db.post.update({
      where: { id: postId },
      data: {
        ...(newTitle && { title: newTitle }),
        ...(newContent && { content: newContent })
      },
      include: { author: true }
    });

    return {
      code: 200,
      message: 'Post updated successfully',
      success: true,
      post: updatedPost
    };
  } catch (e) {
    return {
      code: 500,
      message: e instanceof Error ? e.message : 'Failed to update post',
      success: false,
      post: null
    };
  }
};

const deletePost: MutationResolvers['deletePost'] = async (
  _,
  { postId },
  context: Context
) => {
  try {
    if (!context.user) throw new Error('User is not authenticated');

    const existingPost = await db.post.findUnique({
      where: { id: postId }
    });

    if (!existingPost) throw new Error('Post not found');
    if (existingPost.authorId !== context.user.id) throw new Error('Unauthorized');

    await db.post.delete({
      where: { id: postId }
    });

    return {
      code: 200,
      message: 'Post deleted successfully',
      success: true,
      post: existingPost
    };
  } catch (e) {
    return {
      code: 500,
      message: e instanceof Error ? e.message : 'Failed to delete post',
      success: false,
      post: null
    };
  }
};

export const postMutations: PostMutations = {
  createPost,
  updatePost,
  deletePost
};