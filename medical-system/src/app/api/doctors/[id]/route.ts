// src/app/api/doctors/[id]/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Doctor from '../../../models/Doctor';
import mongoose from 'mongoose';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // اعتبارسنجی ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'شناسه پزشک نامعتبر است' },
        { status: 400 }
      );
    }

    // دریافت اطلاعات پزشک
    const doctor = await Doctor.findById(id).select('-passwordHash').lean();

    if (!doctor) {
      return NextResponse.json(
        { message: 'پزشک پیدا نشد' },
        { status: 404 }
      );
    }

    // تبدیل به فرمت مناسب
    const formattedDoctor = {
      ...doctor,
      _id: doctor._id.toString(),
      id: doctor._id.toString(),
    };

    return NextResponse.json({
      success: true,
      doctor: formattedDoctor,
    });

  } catch (error: any) {
    console.error('❌ خطا در دریافت اطلاعات پزشک:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}