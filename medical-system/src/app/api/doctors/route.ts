// src/app/api/doctors/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import Doctor from '../../models/Doctor';

export async function GET(request: Request) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const specialty = url.searchParams.get('specialty');
    const cities = url.searchParams.get('cities')?.split(',') || [];
    const gender = url.searchParams.get('gender')?.split(',') || [];
    const hasSlot = url.searchParams.get('hasSlot') === 'true';
    const isOnline = url.searchParams.get('isOnline') === 'true';
    const canInPerson = url.searchParams.get('canInPerson') === 'true';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const sort = url.searchParams.get('sort') || 'mostPopular';

    // ساخت فیلتر جستجو
    let filter: any = {};

    // فیلتر تخصص
    if (specialty) {
      filter.specialty = { $regex: specialty, $options: 'i' };
    }

    // فیلتر جستجوی متن
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialty: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
      ];
    }

    // فیلتر شهرها
    if (cities.length > 0) {
      filter.$or = filter.$or || [];
      cities.forEach(city => {
        filter.$or.push(
          { location: { $regex: city, $options: 'i' } },
          { address: { $regex: city, $options: 'i' } }
        );
      });
    }

    // فیلتر جنسیت
    if (gender.length > 0) {
      filter.gender = { $in: gender };
    }

    // فیلتر آنلاین
    if (isOnline) {
      filter.isOnline = true;
    }

    // فیلتر حضوری
    if (canInPerson) {
      filter.canInPerson = true;
    }

    // مرتب‌سازی
    let sortOption: any = {};
    switch (sort) {
      case 'mostPopular':
        sortOption = { rating: -1, reviewCount: -1 };
        break;
      case 'mostBookings':
        sortOption = { reviewCount: -1 };
        break;
      case 'nearestAvailable':
        sortOption = { firstAvailable: 1 };
        break;
      default:
        sortOption = { rating: -1 };
    }

    // محاسبه pagination
    const skip = (page - 1) * limit;

    // دریافت پزشکان
    const doctors = await Doctor.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .select('-passwordHash')
      .lean();

    // تعداد کل برای pagination
    const total = await Doctor.countDocuments(filter);

    // تبدیل _id به string
    const formattedDoctors = doctors.map((doc: any) => ({
      ...doc,
      _id: doc._id.toString(),
      id: doc._id.toString(),
    }));

    return NextResponse.json({
      success: true,
      doctors: formattedDoctors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error: any) {
    console.error('❌ خطا در دریافت لیست پزشکان:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}