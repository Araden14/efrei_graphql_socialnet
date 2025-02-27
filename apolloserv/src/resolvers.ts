import { userMutations } from "./domain/user/mutations.js";
import { Resolvers } from "./types.js";
import { postMutations } from "./domain/posts/mutations.js";
import { postQueries } from "./domain/posts/queries.js";
import { PostResolver } from "./domain/posts/models.js";
import { likeQueries } from "./domain/likes/queries.js";
import { LikeResolver } from "./domain/likes/models.js";
import { likeMutations } from "./domain/likes/mutations.js";
import { commentQueries } from "./domain/comments/queries.js";
import { CommentResolver } from "./domain/comments/models.js";
import { commentMutations } from "./domain/comments/mutations.js";
import { userQueries } from "./domain/user/queries.js";
export const resolvers: Resolvers = {
  Mutation: {
    ...userMutations,
    ...postMutations,
    ...likeMutations,
    ...commentMutations,
  },
  Query: {
    ...postQueries,
    ...likeQueries,
    ...commentQueries,
    ...userQueries,
  },
  GraphQLPost: PostResolver,
  GraphQLLike: LikeResolver,
  GraphQLComment: CommentResolver,  
} 