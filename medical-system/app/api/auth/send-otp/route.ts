import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Otp from '../../../models/Otp';
import { sendOtpSms } from '../../../lib/sms';

export async function POST(request: Request) {
  try {
    // ۱. اتصال به دیتابیس
    await connectDB();

    // ۲. دریافت شماره موبایل از فرانت‌اَند
    const { phone } = await request.json();

    // اعتبارسنجی اولیه شماره موبایل
    if (!phone || !/^09\d{9}$/.test(phone)) {
      return NextResponse.json(
        { message: 'لطفاً یک شماره موبایل معتبر وارد کنید.' },
        { status: 400 }
      );
    }

    // ۳. تولید یک کد ۵ رقمی تصادفی
    const otpCode = Math.floor(10000 + Math.random() * 90000).toString();

    // ۴. تعیین زمان انقضا (۲ دقیقه دیگر)
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

    // ۵. پاک کردن کدهای قبلی این شماره (اگر وجود داشته باشد) برای خلوت ماندن دیتابیس
    await Otp.deleteMany({ phone });

    // ۶. ذخیره کد جدید در دیتابیس
    await Otp.create({
      phone,
      code: otpCode,
      expiresAt,
    });

    // ۷. ارسال پیامک واقعی از طریق پنل SMS.ir
    const smsSent = await sendOtpSms(phone, otpCode);

    // ۸. شبیه‌سازی برای لوکال (کد را در ترمینال چاپ می‌کنیم تا بدون پیامک هم بتوانی تست کنی)
    console.log(`=========================================`);
    console.log(`📱 OTP Code for ${phone}: [ ${otpCode} ]`);
    console.log(`=========================================`);

    // اگر پیامک ارسال شد یا حتی اگر در لوکال بودی و ارسال نشد، به فرانت پیام موفقیت می‌دهیم
    return NextResponse.json(
      { 
        success: true, 
        message: 'کد تایید با موفقیت ارسال شد.',
        // در محیط پروداکشن نباید کد را برگردانیم، اما برای راحتی کار فرانت‌اَند در لوکال موقتاً می‌توانی این خط را نگه داری:
        devModeCode: otpCode 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ خطا در API ارسال کد:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}