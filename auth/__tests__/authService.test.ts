import { registerUser, loginUser } from '../services/authService';
import jwt from 'jsonwebtoken';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mocked_jwt_token'),
  verify: jest.fn().mockImplementation((token) => {
    if (token === 'valid_token') {
      return { username: 'testuser', role: 'Customer' };
    }
    throw new Error('Invalid token');
  }),
}));

describe('authService', () => {
  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      const user = { username: 'testuser', password: 'password123', role: 'Customer' };
      await expect(registerUser(user)).resolves.toBeUndefined();
    });

    it('should throw an error if the user already exists', async () => {
      const user = { username: 'testuser', password: 'password123', role: 'Customer' };
      await registerUser(user); // Register the user first
      await expect(registerUser(user)).rejects.toThrow('User already exists');
    });
  });

  describe('loginUser', () => {
    it('should return a JWT token for valid credentials', async () => {
      const user = { username: 'testuser', password: 'password123' };
      const token = await loginUser(user);
      expect(token).toBe('mocked_jwt_token');
    });

    it('should throw an error for invalid credentials', async () => {
      jest.mocked(require('bcrypt').compare).mockResolvedValueOnce(false);
      const user = { username: 'testuser', password: 'wrongpassword' };
      await expect(loginUser(user)).rejects.toThrow('Invalid credentials');
    });
  });
});
