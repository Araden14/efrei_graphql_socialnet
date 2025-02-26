import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers.js';
import { getUser } from './modules/auth.js';
import db from './db.js';
import { Context } from './context';
import { readFileSync } from 'fs';
import { userMutations } from './domain/user/mutations.js';
import { PrismaClient } from '.prisma/client';

const typeDefs = readFileSync('./src/schema.graphql', 'utf-8');

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});
 
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({req}) => {
    const authorization = (req.headers.authorization)?.split('Bearer ')?.[1]
    const user = authorization ? getUser(authorization) : null
    return {
      dataSources: {
        db,
      },
      user
    }
  }
});
 
console.log(`🚀  Server ready at: ${url}`);