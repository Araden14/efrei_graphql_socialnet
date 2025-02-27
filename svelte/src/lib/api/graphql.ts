import { client } from './apollo';
import { gql } from '@apollo/client/core';

// Export the client and gql for use in components
export { client, gql };

// Helper function to execute queries
export async function query(queryString: string, variables = {}) {
  return client.query({
    query: gql(queryString),
    variables
  });
}

// Helper function to execute mutations
export async function mutate(mutationString: string, variables = {}) {
  return client.mutate({
    mutation: gql(mutationString),
    variables
  });
} 