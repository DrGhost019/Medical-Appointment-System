// src/app/api/doctors/[id]/slots/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Slot from '../../../../models/Slot';
import mongoose from 'mongoose';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    // اعتبارسنجی ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'شناسه پزشک نامعتبر است' },
        { status: 400 }
      );
    }

    // ساخت فیلتر
    let filter: any = {
      doctorId: id,
      isReserved: false, // فقط نوبت‌های آزاد
    };

    // فیلتر بر اساس تاریخ (اختیاری)
    if (date) {
      filter.date = date;
    }

    // دریافت اسلات‌ها
    const slots = await Slot.find(filter)
      .sort({ date: 1, time: 1 })
      .lean();

    // تبدیل به فرمت مناسب
    const formattedSlots = slots.map((slot: any) => ({
      _id: slot._id.toString(),
      doctorId: slot.doctorId.toString(),
      date: slot.date,
      time: slot.time,
      isReserved: slot.isReserved,
    }));

    return NextResponse.json({
      success: true,
      count: formattedSlots.length,
      slots: formattedSlots,
    });

  } catch (error: any) {
    console.error('❌ خطا در دریافت اسلات‌های پزشک:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}