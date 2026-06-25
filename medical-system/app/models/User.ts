import mongoose, { Schema, Document, Model } from 'mongoose';

// تعریف تایپ‌های مربوط به کاربر برای تایپ‌اسکریپت
export interface IUser extends Document {
  phone: string;
  name?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    phone: {
      type: String,
      required: [true, 'وارد کردن شماره موبایل الزامی است.'],
      unique: true,
      trim: true,
      match: [/^09\d{9}$/, 'لطفاً یک شماره موبایل معتبر وارد کنید (مثال: 09123456789)'],
    },
    name: {
      type: String,
      trim: true,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, // به صورت خودکار فیلدهای createdAt و updatedAt را می‌سازد
  }
);

// جلوگیری از بازنویسی مدل در صورت وجود داشتن در کش Mongoose
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;