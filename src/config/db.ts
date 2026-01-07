import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost:27017/users');
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
