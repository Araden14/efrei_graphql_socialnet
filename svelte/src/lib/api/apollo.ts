// Import individual exports instead of using default import
import { 
  ApolloClient, 
  InMemoryCache, 
  HttpLink, 
  ApolloLink, 
  concat 
} from '@apollo/client/core/index.js';
import { browser } from '$app/environment';
const API_URL = 'http://localhost:4000/';

// Auth middleware
const authMiddleware = new ApolloLink((operation, forward) => {
  // Get the authentication token from local storage if it exists
  const token = browser ? localStorage.getItem('token') : '';
  
  // Add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }));

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: API_URL,
  credentials: 'include',
  fetchOptions: {
    mode: 'cors',
  }
});

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: 'all'
    },
    query: {
      errorPolicy: 'all'
    }
  }
});

export default client;