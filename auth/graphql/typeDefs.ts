import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    registerUser(username: String!, password: String!, role: String!): String
    loginUser(username: String!, password: String!): String
  }
`;
