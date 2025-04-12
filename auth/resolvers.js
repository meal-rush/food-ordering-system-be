const resolvers = {
  Query: {
    // ...existing code...
    users: async (_, __, { dataSources, req, res }) => {
      const appVersion = req.headers["x-app-version"];
      const requiredVersion = "2.0.0"; // Define the required version

      // Ignore version check for non-API requests like favicon.ico
      if (req.path === "/favicon.ico") {
        return null; // Return null or handle as needed
      }

      if (!appVersion || appVersion < requiredVersion) {
        res.status(426).send("Upgrade Required"); // Set HTTP status to 426
        return null; // Stop further processing
      }

      return await dataSources.userAPI.getUsers();
    },
  },
};

module.exports = resolvers;
