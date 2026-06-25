import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("لطفاً MONGODB_URI را در .env.local تعریف کنید.");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!)
      .then((mongooseInstance) => {
        console.log("=================================");
        console.log(
          "Database:",
          mongooseInstance.connection.db?.databaseName
        );
        console.log("=================================");

        return mongooseInstance;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default connectDB;