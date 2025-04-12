import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Location {
    coordinates: [Float!]!
  }

  type Address {
    location: Location!
    deliveryAddress: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    phone: String!
    createdAt: String!
    addresses: [Address!]!
  }

  type Query {
    users: [User!]!
    login(username: String!, password: String!): User
  }

  type Mutation {
    register(username: String!, password: String!, role: String!): String
  }
`;
