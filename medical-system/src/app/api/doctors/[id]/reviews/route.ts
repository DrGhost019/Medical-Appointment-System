// src/app/api/doctors/[id]/reviews/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Testimonial from '../../../../models/Testimonial';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const reviews = await Testimonial.find({ doctorId: id })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return NextResponse.json({
      success: true,
      reviews: reviews.map((review: any) => ({
        _id: review._id.toString(),
        userName: review.userName,
        userImage: review.userImage || '/assets/default-avatar.png',
        rating: review.rating,
        date: review.date,
        comment: review.comment,
      })),
    });
  } catch (error: any) {
    console.error('❌ Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, message: 'خطای سرور' },
      { status: 500 }
    );
  }
}