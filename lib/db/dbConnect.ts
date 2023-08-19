// lib/db/dbConnect.ts
import mongoose from 'mongoose';

const DB_URI = process.env.MONGO_URI || '';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  console.log('dbConnect cached.conn', cached.conn);

  if (!cached.promise) {
    cached.promise = mongoose
      .set({ debug: true, strictQuery: false })
      .connect(`${DB_URI}`)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default dbConnect;