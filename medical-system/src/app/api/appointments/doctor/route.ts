import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Slot from '../../../models/Slot';
import User from '../../../models/User'; // برای رجیستر شدن اسکیما و پاپولیت اطلاعات بیمار
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    await connectDB();

    // جهت اطمینان از رجیستر شدن اسکیمای کاربران در حافظه مانگوس برای پاپولیت
    const _userModel = User;

    // ۱. بررسی و تایید توکن JWT پزشک
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'دسترسی غیرمجاز؛ توکن امنیتی ارسال نشده است.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET!;
    
    let decoded: any;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (err) {
      return NextResponse.json(
        { message: 'توکن نامعتبر یا منقضی شده است.' },
        { status: 401 }
      );
    }

    // بررسی نقش کاربر (فقط نقش doctor دسترسی دارد)
    if (decoded.role !== 'doctor') {
      return NextResponse.json(
        { message: 'دسترسی غیرمجاز؛ فقط پزشکان به این بخش دسترسی دارند.' },
        { status: 403 }
      );
    }

    const doctorId = decoded.userId;

    // ۲. پیدا کردن تمام اسلات‌های مربوط به این پزشک که رزرو شده‌اند
    // با استفاده از populate، اطلاعات بیمار (نام و شماره تلفن) را هم می‌آوریم
    const doctorAppointments = await Slot.find({ doctorId, isReserved: true })
      .populate({
        path: 'patientId',
        model: _userModel,
        select: 'phone name', // فقط فیلدهای مورد نیاز بیمار را برمی‌گردانیم
      })
      .sort({ date: 1, time: 1 }); // مرتب‌سازی بر اساس تاریخ و ساعت نوبت‌ها

    return NextResponse.json(
      {
        success: true,
        count: doctorAppointments.length,
        appointments: doctorAppointments,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ خطا در دریافت نوبت‌های پزشک:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}