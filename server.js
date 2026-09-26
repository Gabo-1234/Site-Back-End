import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

try {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Successfully connected to MongoDB!');
} catch (err) {
  console.error('MongoDB connection error:', err);
  process.exit(1);
}