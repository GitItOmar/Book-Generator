import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI ?? "";

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongooseCache = global as typeof global & {
  mongoose: MongooseCache;
};

if (!globalWithMongooseCache.mongoose) {
  globalWithMongooseCache.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongooseCache.mongoose;

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((promise) => promise);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
