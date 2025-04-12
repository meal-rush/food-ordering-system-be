const resolvers = {
  Query: {
    // ...existing resolvers...
    users: async (_, __, { dataSources }) => {
      return await dataSources.userAPI.getUsers();
    },
  },
};

module.exports = resolvers;
