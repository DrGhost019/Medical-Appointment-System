// src/app/api/appointments/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import Slot from '../../models/Slot';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'دسترسی غیرمجاز' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== 'user') {
      return NextResponse.json({ message: 'فقط کاربران مجاز به رزرو هستند' }, { status: 403 });
    }

    const { slotId } = await request.json();

    if (!slotId) {
      return NextResponse.json({ message: 'شناسه نوبت الزامی است' }, { status: 400 });
    }

    const slot = await Slot.findById(slotId);

    if (!slot) {
      return NextResponse.json({ message: 'نوبت یافت نشد' }, { status: 404 });
    }

    if (slot.isReserved) {
      return NextResponse.json({ message: 'این نوبت قبلاً رزرو شده است' }, { status: 400 });
    }

    // ✅ ذخیره اطلاعات کامل
    slot.isReserved = true;
    slot.patientId = decoded.userId;
    // ✅ اگه doctorId توی slot نبود، از خود slot بگیر
    await slot.save();

    return NextResponse.json({
      success: true,
      message: 'نوبت با موفقیت رزرو شد',
      appointment: {
        slotId: slot._id,
        date: slot.date,
        time: slot.time,
        doctorId: slot.doctorId,
      },
    });

  } catch (error: any) {
    console.error('❌ Error in booking:', error);
    return NextResponse.json(
      { message: 'خطای سرور', error: error.message },
      { status: 500 }
    );
  }
}