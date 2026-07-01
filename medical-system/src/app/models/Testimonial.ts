// src/models/Testimonial.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
  userName: string;
  userImage?: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  doctorName: string;
  doctorId?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    userName: {
      type: String,
      required: [true, 'نام کاربر الزامی است'],
      trim: true,
    },
    userImage: {
      type: String,
      default: '/assets/logo.png',
    },
    avatar: {
      type: String,
      default: '/assets/logo.png',
    },
    rating: {
      type: Number,
      required: [true, 'امتیاز الزامی است'],
      min: 1,
      max: 5,
      default: 5,
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('fa-IR'),
    },
    comment: {
      type: String,
      required: [true, 'متن نظر الزامی است'],
    },
    doctorName: {
      type: String,
      required: [true, 'نام پزشک الزامی است'],
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;