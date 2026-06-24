import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Doctor from '../../../models/Doctor';
import Slot from '../../../models/Slot';

export async function GET(request: Request) {
  try {
    await connectDB();

    // ۱. دریافت تمام پزشکان از دیتابیس (بدون فرستادن پسورد هش‌شده)
    const doctors = await Doctor.find({}).select('-passwordHash');

    // ۲. برای هر پزشک، بازه‌های زمانی که هنوز رزرو نشده‌اند (isReserved: false) را پیدا می‌کنیم
    const doctorsWithSlots = await Promise.all(
      doctors.map(async (doctor) => {
        const availableSlots = await Slot.find({
          doctorId: doctor._id,
          isReserved: false, // فقط نوبت‌های خالی و قابل رزرو
        }).select('date time isReserved');

        return {
          ...doctor.toObject(),
          availableSlots,
        };
      })
    );

    // ۳. بازگرداندن دیتای نهایی به فرانت‌اَند
    return NextResponse.json(
      {
        success: true,
        count: doctorsWithSlots.length,
        doctors: doctorsWithSlots,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ خطا در دریافت لیست پزشکان و نوبت‌ها:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}