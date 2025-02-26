import { userMutations } from "./domain/user/mutations.js";
import { Resolvers } from "./types.js";
import { postMutations } from "./domain/posts/mutations.js";
import { postQueries } from "./domain/posts/queries.js";
import { PostResolver } from "./domain/posts/models.js";
import { likeQueries } from "./domain/likes/queries.js";
import { LikeResolver } from "./domain/likes/models.js";
import { likeMutations } from "./domain/likes/mutations.js";
export const resolvers: Resolvers = {
  Mutation: {
    ...userMutations,
    ...postMutations,
    ...likeMutations,
  },
  Query: {
    ...postQueries,
    ...likeQueries,
  },
  GraphQLPost: PostResolver,
  GraphQLLike: LikeResolver,
} 