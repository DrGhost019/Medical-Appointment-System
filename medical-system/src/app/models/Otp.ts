import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOtp extends Document {
  phone: string;
  code: string;
  expiresAt: Date;
  createdAt: Date;
}

const OtpSchema: Schema<IOtp> = new Schema({
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^09\d{9}$/,
  },
  code: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // این خط باعث می‌شود رکورد بعد از ۱۲۰ ثانیه (۲ دقیقه) خود به خود از دیتابیس پاک شود (TTL Index)
    index: { expires: 120 }, 
  },
});

const Otp: Model<IOtp> = mongoose.models.Otp || mongoose.model<IOtp>('Otp', OtpSchema);

export default Otp;