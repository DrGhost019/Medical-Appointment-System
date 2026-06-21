import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('لطفاً متغیر MONGODB_URI را در فایل env تعریف کنید.');
}

/**
 * ایجاد یک کش سراسری برای جلوگیری از ساخت کانکشن‌های متعدد در توسعه (Development)
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log('✅ اتصال به دیتابیس MongoDB با موفقیت برقرار شد.');
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ خطا در اتصال به دیتابیس:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;