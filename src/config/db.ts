import mongoose from 'mongoose';
import 'dotenv/config';
const mongo_URI = process.env.MONGODB_URI;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
