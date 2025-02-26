// import { MutationResolvers } from "../../types.js";
// import { Context } from "../../context.js";
// import db from "../../db.js";

// export const likeMutations: MutationResolvers = {
//     likePost: async (_, { postId }, { user, dataSources: { db } }: Context) => {
//         if (!user) {
//             return {
//                 code: 401,
//                 success: false,
//                 message: "Unauthenticated",
//                 like: null
//             };
//         }

//         try {
//             const like = await db.like.create({
//                 data: {
//                     userId: user.id,
//                     postId: postId
//                 }
//             });

//             return {
//                 code: 201,
//                 success: true,
//                 message: "Post liked successfully",
//                 like: {
//                     ...like,
//                     createdAt: like.createdAt.toISOString(),
//                     updatedAt: like.updatedAt.toISOString()
//                 }
//             };
//         } catch (error) {
//             console.error("Error liking post:", error);
//             return {
//                 code: 500,
//                 success: false,
//                 message: "Failed to like post",
//                 like: null
//             };
//         }
//     },
    
//     unlikePost: async (_, { postId }, { user, dataSources: { db } }: Context) => {
//         if (!user) {
//             return {
//                 code: 401,
//                 success: false,
//                 message: "Unauthenticated",
//                 like: null
//             };
//         }

//         try {
//             const like = await db.like.delete({
//                 where: {
//                     userId_postId: {
//                         userId: user.id,
//                         postId: postId
//                     }
//                 }
//             });

//             return {
//                 code: 200,
//                 success: true,
//                 message: "Post unliked successfully",
//                 like: {
//                     ...like,
//                     createdAt: like.createdAt.toISOString(),
//                     updatedAt: like.updatedAt.toISOString()
//                 }
//             };
//         } catch (error) {
//             console.error("Error unliking post:", error);
//             return {
//                 code: 500,
//                 success: false,
//                 message: "Failed to unlike post",
//                 like: null
//             };
//         }
//     }
// };
