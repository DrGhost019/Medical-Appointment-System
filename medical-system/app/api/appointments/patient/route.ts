import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Slot from '../../../models/Slot';
import Doctor from '../../../models/Doctor'; // برای ثبت اجباری اسکیما
import User from '../../../models/User';     // برای ثبت اجباری اسکیما
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    await connectDB();

    // برای مطمئن شدن از این که مدل‌ها ۱۰۰٪ در حافظه مانگوس رجیستر شده‌اند و رفع وارنینگ ادیتور
    const _docModel = Doctor;
    const _userModel = User;

    // ۱. بررسی و تایید توکن JWT بیمار
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

    if (decoded.role !== 'user') {
      return NextResponse.json(
        { message: 'فقط کاربران عادی به این بخش دسترسی دارند.' },
        { status: 403 }
      );
    }

    const patientId = decoded.userId;

    // ۲. پیدا کردن تمام اسلات‌هایی که به نام این بیمار رزرو شده‌اند
    const myAppointments = await Slot.find({ patientId, isReserved: true })
      .populate({
        path: 'doctorId',
        model: _docModel, // پاس دادن مستقیم مدل جهت پاپولیت امن
        select: 'name specialty avatar', 
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: myAppointments.length,
        appointments: myAppointments,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ خطا در دریافت نوبت‌های بیمار:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}