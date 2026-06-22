import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  phone: string;
  passwordHash: string; // برای لاگین پزشک با پسورد
  specialty: string;    // تخصص (مثلا: قلب و عروق، پوست و مو)
  bio?: string;
  avatar?: string;
  createdAt: Date;
}

const DoctorSchema: Schema<IDoctor> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'نام پزشک الزامی است.'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'شماره موبایل الزامی است.'],
      unique: true,
      trim: true,
      match: [/^09\d{9}$/, 'شماره موبایل معتبر نیست.'],
    },
    passwordHash: {
      type: String,
      required: [true, 'رمز عبور الزامی است.'],
    },
    specialty: {
      type: String,
      required: [true, 'تخصص پزشک الزامی است.'],
      trim: true,
    },
    bio: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '', // آدرس عکس پزشک
    },
  },
  { timestamps: true }
);

const Doctor: Model<IDoctor> = mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);

export default Doctor;