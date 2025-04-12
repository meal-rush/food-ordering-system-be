
import { ApolloServer } from 'apollo-server';

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { connectToDatabase } from './services/dbService';





import logger from './utils/logger';

dotenv.config();



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {

    // Add any context setup here, such as authentication
    return { headers: req.headers };
  },
});

// Start the server
server.listen({ port: 9001 }).then(({ url }) => {
  logger.info(`GraphQL server running at ${url}`);


});
