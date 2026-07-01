// src/app/api/doctors/[id]/slots/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Slot from '../../../../models/Slot';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    // ✅ گرفتن همه اسلات‌ها از دیتابیس (بدون فیلتر)
    const allSlots = await Slot.find({}).lean();

    // ✅ فیلتر کردن در جاوااسکریپت (نه مونگو)
    let filteredSlots = allSlots.filter((slot: any) => {
      // ۱. doctorId رو با id مقایسه کن (هر دو string)
      const slotDoctorId = slot.doctorId.toString();
      if (slotDoctorId !== id) return false;

      // ۲. فقط اسلات‌های آزاد (isReserved: false)
      if (slot.isReserved === true) return false;

      // ۳. اگه تاریخ داده شده، فقط همون روز رو نشون بده
      if (date && slot.date !== date) return false;

      return true;
    });

    // مرتب‌سازی بر اساس تاریخ و ساعت
    filteredSlots.sort((a: any, b: any) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.time.localeCompare(b.time);
    });

    // تبدیل به فرمت خروجی
    const formattedSlots = filteredSlots.map((slot: any) => ({
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
    console.error('❌ Error in slots API:', error);
    return NextResponse.json(
      { message: 'خطای سرور', error: error.message },
      { status: 500 }
    );
  }
}