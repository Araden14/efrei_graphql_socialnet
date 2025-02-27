import { gql } from "graphql-tag";

export const SignIn = gql`
mutation Login($email: String!, $password: String!, $username: String) {
  SignIn(email: $email, password: $password, username: $username) {
    code
    success
    message
    token
    user {
      id
      email
      username
    }
  }
}
`;

export const createUser = gql`
mutation Register($email: String!, $password: String!, $username: String!) {
  createUser(email: $email, password: $password, username: $username) {
    code
    success
    message
    user {
      id
      email
      username
    }
  }
}
`;

export const verifyUser = gql`
query Verify($token: String!) {
  verifyUser(token: $token) {
    code
    success
    user {
      id
      email
      username
    }
  }
}
`;