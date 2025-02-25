import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { UserResolver } from './graphql/resolvers/user.resolver.js';
import { PostResolver } from './graphql/resolvers/post.resolver.js';

import db from './db.js';

// Lire le schéma GraphQL
const typeDefs = readFileSync('./src/graphql/schema.graphql', 'utf-8');

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      ...UserResolver.Query,
      ...PostResolver.Query
    },
    Mutation: {
      ...UserResolver.Mutation,
      ...PostResolver.Mutation
    }
  }
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => ({
    prisma: db,
    token: req.headers.authorization?.split('Bearer ')[1]
  })
});

console.log(`🚀 Server ready at ${url}`);