import { registerUser, loginUser } from '../services/authService';
import { Role } from '../models/roles';


export const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
  Mutation: {
    registerUser: async (
      _: any,
      { username, password, role }: { username: string; password: string; role: Role }
    ) => {
      await registerUser({ username, password, role });
      return 'User registered successfully';
    },
    loginUser: async (_: any, { username, password }: { username: string; password: string }) => {
      const token = await loginUser({ username, password });
      return token;
    },

  },
};
