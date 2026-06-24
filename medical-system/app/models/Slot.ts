import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISlot extends Document {
  doctorId: mongoose.Types.ObjectId;
  patientId?: mongoose.Types.ObjectId; // اگر رزرو شود، آی‌دی بیمار اینجا قرار می‌گیرد
  date: string;       // تاریخ به صورت رشته (مثال: "1405/04/10")
  time: string;       // ساعت بازه (مثال: "16:30 - 17:00")
  isReserved: boolean; // وضعیت رزرو بودن یا نبودن بازه
  createdAt: Date;
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
      default: null,
    },
    date: {
      type: String,
      required: [true, 'وارد کردن تاریخ الزامی است.'], // فرمت نمونه: YYYY/MM/DD
    },
    time: {
      type: String,
      required: [true, 'وارد کردن بازه زمانی الزامی است.'], // فرمت نمونه: "10:00 - 10:30"
    },
    isReserved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ایجاد یک Compound Index برای اینکه یک پزشک نتواند در یک تاریخ و ساعت مشخص، دو بار بازه تکراری بسازد
SlotSchema.index({ doctorId: 1, date: 1, time: 1 }, { unique: true });

const Slot: Model<ISlot> = mongoose.models.Slot || mongoose.model<ISlot>('Slot', SlotSchema);

export default Slot;