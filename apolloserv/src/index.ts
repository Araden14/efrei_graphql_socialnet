import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {gql} from 'graphql-tag'
import { resolvers } from './resolvers.js';


 
const typeDefs = gql`
  type Query {
  doctors: [Doctor]
}
  
  

  type Doctor {
    name: String
    speciality: Speciality
  }


 
  enum Speciality {
    PSYCHOLOGISTZ
    OPHTALMOLOGIST
  }
`;



const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
   
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
   
  console.log(`🚀  Server ready at: ${url}`);
