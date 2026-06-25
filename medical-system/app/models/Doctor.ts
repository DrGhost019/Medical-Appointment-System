import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  phone: string;
  passwordHash: string; // رمز عبور هش‌شده پزشک
  specialty: string;    // تخصص (مثلاً: قلب و عروق، دندانپزشکی)
  bio?: string;
  avatar?: string;      // لینک تصویر پروفایل
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema: Schema<IDoctor> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'وارد کردن نام پزشک الزامی است.'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'وارد کردن شماره موبایل الزامی است.'],
      unique: true,
      trim: true,
      match: [/^09\d{9}$/, 'لطفاً یک شماره موبایل معتبر وارد کنید.'],
    },
    passwordHash: {
      type: String,
      required: [true, 'وارد کردن رمز عبور الزامی است.'],
    },
    specialty: {
      type: String,
      required: [true, 'وارد کردن تخصص پزشک الزامی است.'],
      trim: true,
    },
    bio: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Doctor: Model<IDoctor> = mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);

export default Doctor;