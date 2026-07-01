// src/models/Slot.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISlot extends Document {
  doctorId: mongoose.Types.ObjectId;
  patientId?: mongoose.Types.ObjectId | null; // ✅ اضافه کردن null به تایپ
  date: string;
  time: string;
  isReserved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SlotSchema: Schema<ISlot> = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'شناسه پزشک الزامی است.'],
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null, // ✅ مقدار پیش‌فرض null
    },
    date: {
      type: String,
      required: [true, 'وارد کردن تاریخ الزامی است.'],
    },
    time: {
      type: String,
      required: [true, 'وارد کردن بازه زمانی الزامی است.'],
    },
    isReserved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ایجاد Compound Index برای جلوگیری از تکراری بودن
SlotSchema.index({ doctorId: 1, date: 1, time: 1 }, { unique: true });

const Slot: Model<ISlot> = mongoose.models.Slot || mongoose.model<ISlot>('Slot', SlotSchema);

export default Slot;