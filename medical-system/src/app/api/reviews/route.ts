// src/app/api/reviews/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import Testimonial from '../../models/Testimonial';
import Doctor from '../../models/Doctor';
import User from '../../models/User';
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
      return NextResponse.json({ message: 'فقط کاربران مجاز به ثبت نظر هستند' }, { status: 403 });
    }

    const { doctorId, rating, comment } = await request.json();

    console.log('📝 Received:', { doctorId, rating, comment });

    if (!doctorId || !rating || !comment) {
      return NextResponse.json({ message: 'تمامی فیلدها الزامی هستند' }, { status: 400 });
    }

    // ✅ پیدا کردن پزشک با find و toString()
    const allDoctors = await Doctor.find().lean();
    const doctor = allDoctors.find((d: any) => d._id.toString() === doctorId);

    if (!doctor) {
      console.log('❌ Doctor not found for ID:', doctorId);
      return NextResponse.json({ message: 'پزشک یافت نشد' }, { status: 404 });
    }

    console.log('✅ Doctor found:', doctor.name);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: 'کاربر یافت نشد' }, { status: 404 });
    }

    // ثبت نظر
    const testimonial = await Testimonial.create({
      doctorId: doctorId,
      userId: decoded.userId,
      userName: user.name || 'کاربر',
      rating: rating,
      comment: comment,
      date: new Date().toLocaleDateString('fa-IR'),
    });

    // به‌روزرسانی امتیاز پزشک
    const allReviews = await Testimonial.find({ doctorId });
    const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
    
    // ✅ به‌روزرسانی با find و toString()
    const targetDoctor = allDoctors.find((d: any) => d._id.toString() === doctorId);
    if (targetDoctor) {
      await Doctor.findByIdAndUpdate(targetDoctor._id, {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: allReviews.length,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'نظر شما با موفقیت ثبت شد',
      testimonial: {
        _id: testimonial._id,
        rating: testimonial.rating,
        comment: testimonial.comment,
        userName: testimonial.userName,
        date: testimonial.date,
      },
    });

  } catch (error: any) {
    console.error('❌ Error submitting review:', error);
    return NextResponse.json(
      { message: 'خطای سرور', error: error.message },
      { status: 500 }
    );
  }
}