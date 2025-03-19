import mongoose from 'mongoose';
import { connectDB } from './db';
import logger from '../utils/logger'; // Import the logger

jest.mock('mongoose', () => ({
    connect: jest.fn(),
    connection: {
        db: {
            listCollections: jest.fn().mockReturnValue({
                toArray: jest.fn(),
            }),
            collection: jest.fn().mockReturnValue({
                insertOne: jest.fn(),
            }),
        },
    },
}));

describe('Database Connection', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if MONGO_URI is not defined', async () => {
        process.env.MONGO_URI = '';
        await expect(connectDB()).rejects.toThrow('MONGO_URI is not defined in the .env file');
        logger.error('Test failed: MONGO_URI is not defined'); // Log error
    });

    it('should connect to the database successfully', async () => {
        process.env.MONGO_URI = 'mongodb://localhost:27017/testdb';
        const mockConnect = mongoose.connect as jest.Mock;
        mockConnect.mockResolvedValueOnce({});
        await connectDB();
        expect(mockConnect).toHaveBeenCalledWith(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('Test passed: Database connected successfully'); // Log success
    });

    it('should create a default collection if no collections exist', async () => {
        const mockListCollections = jest.fn().mockReturnValueOnce({
            toArray: jest.fn().mockResolvedValueOnce([]),
        });
        const mockInsertOne = jest.fn();

        (mongoose.connection.db.listCollections as jest.Mock).mockReturnValueOnce(mockListCollections());
        (mongoose.connection.db.collection as jest.Mock).mockReturnValueOnce({
            insertOne: mockInsertOne,
        });

        process.env.MONGO_URI = 'mongodb://localhost:27017/testdb';
        const mockConnect = mongoose.connect as jest.Mock;
        mockConnect.mockResolvedValueOnce({});
        await connectDB();

        expect(mockListCollections().toArray).toHaveBeenCalled();
        expect(mongoose.connection.db.collection).toHaveBeenCalledWith('defaultCollection');
        expect(mockInsertOne).toHaveBeenCalledWith({ initialized: true });
        logger.info('Test passed: Default collection created successfully'); // Log success
    });

    it('should not create a default collection if collections already exist', async () => {
        const mockListCollections = jest.fn().mockReturnValueOnce({
            toArray: jest.fn().mockResolvedValueOnce([{ name: 'existingCollection' }]),
        });

        (mongoose.connection.db.listCollections as jest.Mock).mockReturnValueOnce(mockListCollections());

        process.env.MONGO_URI = 'mongodb://localhost:27017/testdb';
        const mockConnect = mongoose.connect as jest.Mock;
        mockConnect.mockResolvedValueOnce({});
        await connectDB();

        expect(mockListCollections().toArray).toHaveBeenCalled();
        expect(mongoose.connection.db.collection).not.toHaveBeenCalled();
        logger.info('Test passed: No default collection created as collections already exist'); // Log success
    });
});
