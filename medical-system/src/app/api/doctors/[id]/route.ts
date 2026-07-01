// src/app/api/doctors/[id]/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Doctor from '../../../models/Doctor';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // ✅ استفاده از find با toString()
    const doctors = await Doctor.find().lean();
    const doctor = doctors.find((d: any) => d._id.toString() === id);

    if (!doctor) {
      return NextResponse.json(
        { success: false, message: 'پزشک یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      doctor: {
        ...doctor,
        _id: doctor._id.toString(),
        id: doctor._id.toString(),
      },
    });
  } catch (error: any) {
    console.error('❌ Error fetching doctor:', error);
    return NextResponse.json(
      { success: false, message: 'خطای سرور' },
      { status: 500 }
    );
  }
}