import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'HashiraClubSystem', // optional but recommended
    });

    isConnected = true;
    console.log('[MongoDB] Connected');
  } catch (err) {
    console.error('[MongoDB] Connection failed:', err);
    throw err;
  }
}
