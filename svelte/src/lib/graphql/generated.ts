import client from "../api/apollo";
import type {
        ApolloQueryResult, ObservableQuery, WatchQueryOptions, MutationOptions
      } from "@apollo/client";
import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import gql from "graphql-tag"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  code: Scalars['Int']['output'];
  comment?: Maybe<GraphQlComment>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<GraphQlUser>;
};

export type GraphQlComment = {
  __typename?: 'GraphQLComment';
  author: GraphQlUser;
  authorId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  post: GraphQlPost;
  postId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GraphQlLike = {
  __typename?: 'GraphQLLike';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  post: GraphQlPost;
  postId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: GraphQlUser;
  userId: Scalars['Int']['output'];
};

export type GraphQlPost = {
  __typename?: 'GraphQLPost';
  author?: Maybe<GraphQlUser>;
  authorId: Scalars['Int']['output'];
  comments?: Maybe<Array<GraphQlComment>>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  likes?: Maybe<Array<GraphQlLike>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GraphQlUser = {
  __typename?: 'GraphQLUser';
  comments?: Maybe<Array<GraphQlComment>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  likes?: Maybe<Array<GraphQlLike>>;
  posts?: Maybe<Array<GraphQlPost>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type LikeResponse = {
  __typename?: 'LikeResponse';
  code: Scalars['Int']['output'];
  like?: Maybe<GraphQlLike>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  SignIn: SignInResponse;
  createComment: CommentResponse;
  createPost: PostResponse;
  createUser: CreateUserResponse;
  deleteComment: CommentResponse;
  deletePost: PostResponse;
  likePost: LikeResponse;
  unlikePost: LikeResponse;
  updateComment: CommentResponse;
  updatePost: PostResponse;
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateCommentArgs = {
  content: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int']['input'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationLikePostArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationUnlikePostArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationUpdateCommentArgs = {
  commentId: Scalars['Int']['input'];
  newContent: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  newContent?: InputMaybe<Scalars['String']['input']>;
  newTitle?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['Int']['input'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  post?: Maybe<GraphQlPost>;
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  fetchComments: Array<GraphQlComment>;
  fetchCommentsByPost: Array<GraphQlComment>;
  fetchCommentsByUser: Array<GraphQlComment>;
  fetchLikes: Array<GraphQlLike>;
  fetchLikesByUser: Array<GraphQlLike>;
  fetchPosts: Array<GraphQlPost>;
  verifyUser: UserResponse;
};


export type QueryFetchCommentsByPostArgs = {
  postId: Scalars['Int']['input'];
};


export type QueryVerifyUserArgs = {
  token: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<GraphQlUser>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<GraphQlUser>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginMutation = { __typename?: 'Mutation', SignIn: { __typename?: 'SignInResponse', code: number, success: boolean, message: string, token?: string | null, user?: { __typename?: 'GraphQLUser', id: number, email: string, username?: string | null } | null } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserResponse', code: number, success: boolean, message: string, user?: { __typename?: 'GraphQLUser', id: number, email: string, username?: string | null } | null } };

export type VerifyQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyQuery = { __typename?: 'Query', verifyUser: { __typename?: 'UserResponse', code: number, success: boolean, user?: { __typename?: 'GraphQLUser', id: number, email: string, username?: string | null } | null } };

export type PublishPostMutationVariables = Exact<{
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type PublishPostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', code: number, success: boolean, message: string, post?: { __typename?: 'GraphQLPost', id: number, title: string, content: string, authorId: number, createdAt?: any | null, updatedAt?: any | null, author?: { __typename?: 'GraphQLUser', id: number, email: string, username?: string | null, updatedAt?: any | null, createdAt?: any | null } | null } | null } };

export type PublishCommentMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
}>;


export type PublishCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentResponse', code: number, success: boolean, message: string, comment?: { __typename?: 'GraphQLComment', id: number, authorId: number, content: string, createdAt?: any | null, updatedAt?: any | null, author: { __typename?: 'GraphQLUser', username?: string | null } } | null } };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', fetchPosts: Array<{ __typename?: 'GraphQLPost', id: number, authorId: number, title: string, content: string, createdAt?: any | null, updatedAt?: any | null, author?: { __typename?: 'GraphQLUser', id: number, username?: string | null } | null, comments?: Array<{ __typename?: 'GraphQLComment', id: number, authorId: number, content: string, createdAt?: any | null, updatedAt?: any | null, author: { __typename?: 'GraphQLUser', username?: string | null } }> | null, likes?: Array<{ __typename?: 'GraphQLLike', id: number, createdAt?: any | null, updatedAt?: any | null, userId: number, user: { __typename?: 'GraphQLUser', username?: string | null } }> | null }> };

export type LikeAPostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type LikeAPostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'LikeResponse', code: number, success: boolean, message: string, like?: { __typename?: 'GraphQLLike', userId: number, id: number, postId: number, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'GraphQLUser', username?: string | null } } | null } };


export const LoginDoc = gql`
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
export const RegisterDoc = gql`
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
export const VerifyDoc = gql`
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
export const PublishPostDoc = gql`
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
export const PublishCommentDoc = gql`
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
export const GetPostsDoc = gql`
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
export const LikeAPostDoc = gql`
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
export const Login = (
            options: Omit<
              MutationOptions<any, LoginMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<LoginMutation, LoginMutationVariables>({
              mutation: LoginDoc,
              ...options,
            });
            return m;
          }
export const Register = (
            options: Omit<
              MutationOptions<any, RegisterMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<RegisterMutation, RegisterMutationVariables>({
              mutation: RegisterDoc,
              ...options,
            });
            return m;
          }
export const Verify = (
            options: Omit<
              WatchQueryOptions<VerifyQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<VerifyQuery> & {
              query: ObservableQuery<
                VerifyQuery,
                VerifyQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: VerifyDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<VerifyQuery> & {
                query: ObservableQuery<
                  VerifyQuery,
                  VerifyQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const publishPost = (
            options: Omit<
              MutationOptions<any, PublishPostMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<PublishPostMutation, PublishPostMutationVariables>({
              mutation: PublishPostDoc,
              ...options,
            });
            return m;
          }
export const publishComment = (
            options: Omit<
              MutationOptions<any, PublishCommentMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<PublishCommentMutation, PublishCommentMutationVariables>({
              mutation: PublishCommentDoc,
              ...options,
            });
            return m;
          }
export const getPosts = (
            options: Omit<
              WatchQueryOptions<GetPostsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetPostsQuery> & {
              query: ObservableQuery<
                GetPostsQuery,
                GetPostsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetPostsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetPostsQuery> & {
                query: ObservableQuery<
                  GetPostsQuery,
                  GetPostsQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const likeAPost = (
            options: Omit<
              MutationOptions<any, LikeAPostMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<LikeAPostMutation, LikeAPostMutationVariables>({
              mutation: LikeAPostDoc,
              ...options,
            });
            return m;
          }