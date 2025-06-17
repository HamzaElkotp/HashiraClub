import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  const uri:string = "mongodb+srv://hmzt25235:3KbiP8cTAlmsNldR@cluster0.lpl0c9y.mongodb.net/HashiraClubSystem?retryWrites=true&w=majority&appName=Cluster0";

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables.');
  }

  try {
    await mongoose.connect(uri, { dbName: 'HashiraClubSystem' });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
