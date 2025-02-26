import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { userMutations } from './domain/user/mutations.js';
import db from './db.js';
import { PrismaClient } from '.prisma/client';
import { Context } from './context';
import { resolvers } from './resolvers.js';
// Lire le schéma GraphQL
const typeDefs = readFileSync('./src/schema.graphql', 'utf-8');

interface MyContext {
  prisma: PrismaClient
  token?: string
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers: resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => ({
    prisma: db,
    token: req.headers.authorization?.split('Bearer ')[1],
  }),
});

console.log(`🚀 Server ready at ${url}`);