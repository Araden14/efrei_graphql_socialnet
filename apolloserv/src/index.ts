import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers.js';
import { getUser } from './modules/auth.js';
import db from './db.js';
import { Context } from './context';
import { readFileSync } from 'fs';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';

const typeDefs = readFileSync('./src/schema.graphql', 'utf-8');

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

// Create Express app and HTTP server
const app = express();
const httpServer = http.createServer(app);

// Start the Apollo Server
await server.start();

// Apply middleware
app.use(
  '/',
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const authorization = (req.headers.authorization)?.split('Bearer ')?.[1];
      const user = authorization ? getUser(authorization) : null;
      return {
        dataSources: {
          db,
        },
        user
      };
    },
  }),
);

// Start the HTTP server
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);