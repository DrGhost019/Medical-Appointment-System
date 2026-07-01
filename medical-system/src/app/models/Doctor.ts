// src/models/Doctor.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  phone: string;
  passwordHash?: string;
  specialty: string;
  about?: string;
  bio?: string;
  avatar?: string;
  image?: string;
  rating: number;
  reviewCount: number;
  medicalCode?: string;
  address?: string;
  firstAvailable?: string;
  website?: string;
  instagram?: string;
  availableTimes: string[];
  gender: 'male' | 'female';
  insurances: string[];
  experienceYears: number;
  isOnline: boolean;
  canInPerson: boolean;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    name: {
      type: String,
      required: [true, 'نام پزشک الزامی است'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'شماره موبایل الزامی است'],
      unique: true,
      trim: true,
      match: [/^09\d{9}$/, 'شماره موبایل نامعتبر است'],
    },
    passwordHash: {
      type: String,
      required: function(this: any) {
        return this.isNew;
      },
    },
    specialty: {
      type: String,
      required: [true, 'تخصص الزامی است'],
      trim: true,
    },
    about: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '/assets/logo.png',
    },
    image: {
      type: String,
      default: '/assets/logo.png',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    medicalCode: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    firstAvailable: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
    availableTimes: {
      type: [String],
      default: [],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
    },
    insurances: {
      type: [String],
      default: [],
    },
    experienceYears: {
      type: Number,
      default: 0,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    canInPerson: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
      default: 'تهران',
    },
  },
  {
    timestamps: true,
  }
);

// ایندکس برای جستجو
DoctorSchema.index({ name: 'text', specialty: 'text' });

const Doctor: Model<IDoctor> = mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);

export default Doctor;