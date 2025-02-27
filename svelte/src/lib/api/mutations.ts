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

export const createPost = gql`
mutation publishPost($title: String!, $content: String!) {
  createPost(title: $title, content: $content) {
    code
    success
    message
    post {
      id
      title
      content
      authorId
      author {
        id
        email
        username
        updatedAt
        createdAt
      }
      createdAt
      updatedAt
    }
  }
}
`;

export const createComment = gql`
mutation publishComment($postId: Int!, $content: String!) {
  createComment(postId: $postId, content: $content) {
    code
    success
    message
    comment {
      id
      authorId
      content
      createdAt
      updatedAt
      author {
        username
      }
    }
  }
}
`;

export const fetchPosts = gql`
query getPosts {
    fetchPosts {
    id
    authorId
    title
    content
    createdAt
    updatedAt
    author {
      id
      username
    }
    comments {
      id
      authorId
      content
      createdAt
      updatedAt
      author {
        username
      }
    }
    likes {
      id
      createdAt
      updatedAt
      userId
      user {
        username
      }
    }
  }
}
`;

export const likePost = gql`
mutation likeAPost($postId: Int!) {
 likePost(postId: $postId) {
    code
    success
    message
    like {
      userId
      id
      postId
      user {
        username
      }
      createdAt
      updatedAt
    }
  }
}
`;

