import mongoose, { Mongoose } from "mongoose";

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}
declare global {
  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

export default async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI!;
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose: Mongoose) => mongoose);
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("error connecting to mongodb", error);
  }
  return cached.conn;
}
