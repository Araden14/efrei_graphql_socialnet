import { userMutations } from "./domain/user/mutations.js";
import { Resolvers } from "./types.js";
import { postMutations } from "./domain/posts/mutations.js";
import { postQueries } from "./domain/posts/queries.js";
import { PostResolver } from "./domain/posts/models.js";

export const resolvers: Resolvers = {
  Mutation: {
    ...userMutations,
    ...postMutations,
  },
  Query: {
    ...postQueries,
  },
  GraphQLPost: PostResolver,
}