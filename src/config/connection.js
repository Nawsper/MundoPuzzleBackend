import mongoose from 'mongoose';
import 'dotenv/config'
import { logger } from "../utils/logger.js"

export const connectionString = process.env.MONGO_LOCAL_URL

export async function connectToDatabase() {
    try {
        await mongoose.connect(connectionString);
        logger.debug('Connected to MongoDB database');

    } catch (error) {
        logger.fatal('Error connecting to MongoDB:', error);
    }
}

export default mongoose.connection;