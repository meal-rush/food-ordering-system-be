import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    username: String!
    role: String!
    token: String
  }

  type Query {
    login(username: String!, password: String!): User
  }

  type Mutation {
    register(username: String!, password: String!, role: String!): String
  }
`;
