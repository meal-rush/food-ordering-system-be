import { connectToDatabase } from '../services/dbService';
import mongoose from 'mongoose';

jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue(undefined),
}));

describe('dbService', () => {
  it('should connect to the database successfully', async () => {
    process.env.DB_URI = 'mocked_db_uri';
    await expect(connectToDatabase()).resolves.toBeUndefined();
    expect(mongoose.connect).toHaveBeenCalledWith('mocked_db_uri');
  });

  it('should throw an error if DB_URI is not defined', async () => {
    delete process.env.DB_URI;
    await expect(connectToDatabase()).rejects.toThrow('Database URI is not defined in the environment variables');
  });
});
