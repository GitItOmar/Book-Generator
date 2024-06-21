import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI ?? "";

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

interface MongoCache {
  conn: MongoClient | null;
  promise: Promise<MongoClient> | null;
}

const globalWithMongoCache = global as typeof global & {
  mongo: MongoCache;
};

if (!globalWithMongoCache.mongo) {
  globalWithMongoCache.mongo = { conn: null, promise: null };
}

const cached = globalWithMongoCache.mongo;

let clientPromise: Promise<MongoClient>;

if (cached.conn) {
  clientPromise = Promise.resolve(cached.conn);
} else {
  if (!cached.promise) {
    cached.promise = new MongoClient(MONGO_URI).connect();
    cached.promise.then((client) => {
      cached.conn = client;
      return client;
    });
  }
  clientPromise = cached.promise;
}

const exportedClientPromise = clientPromise;

export { exportedClientPromise as clientPromise };
