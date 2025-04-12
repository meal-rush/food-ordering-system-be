import { ApolloServer } from 'apollo-server';
import { connectToDatabase } from './services/dbService';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import logger from './utils/logger';

// Connect to the database
connectToDatabase();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  },
});

server.listen({ port: 9001 }).then(({ url }) => {
  logger.info(`Auth microservice running at ${url}`);
});
