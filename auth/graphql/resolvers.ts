import { registerUser, loginUser } from '../services/authService';
import { Role } from '../models/roles';

export const resolvers = {
  Query: {
    login: async (_: any, { username, password }: { username: string; password: string }) => {
      const token = await loginUser({ username, password });
      return { username, role: 'User', token }; // Adjust role as needed
    },
  },
  Mutation: {
    register: async (_: any, { username, password, role }: { username: string; password: string; role: string }) => {
      if (!Object.values(Role).includes(role as Role)) {
        throw new Error(`Invalid role: ${role}`);
      }
      await registerUser({ username, password, role: role as Role });
      return 'User registered successfully';
    },
  },
};
