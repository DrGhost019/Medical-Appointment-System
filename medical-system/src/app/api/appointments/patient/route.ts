// src/app/api/appointments/patient/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Slot from '../../../models/Slot';
import Doctor from '../../../models/Doctor';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'دسترسی غیرمجاز' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== 'user') {
      return NextResponse.json({ message: 'فقط کاربران عادی' }, { status: 403 });
    }

    const patientId = decoded.userId;

    // ✅ گرفتن نوبت‌ها با populate کامل
    const appointments = await Slot.find({ patientId, isReserved: true })
      .populate({
        path: 'doctorId',
        select: 'name specialty medicalCode image avatar address phone',
      })
      .sort({ date: -1, time: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: appointments.length,
      appointments,
    });

  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { message: 'خطای سرور', error: error.message },
      { status: 500 }
    );
  }
}