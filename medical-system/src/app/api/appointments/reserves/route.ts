import connectDB from "../../../lib/db"; // ایمپورت کردن تابع اتصالی که فرستادی
import  TimeSlot  from "../../../models/TimeSlot"; // ایمپورت کردن مدل مونگوس شما (اسم مدل خودت را بگذار)

export async function PATCH(request: Request) {
  const { slotId } = await request.json();

  // ۱. اتصال به دیتابیس با اجرای تابعی که اکسپورت کردی
  await connectDB();

  // ۲. کوئری زدن مستقیم روی مدل مونگوس به جای کلمه db
  const existingSlot = await TimeSlot.findById(slotId);
  
  if (!existingSlot) {
    return Response.json({ error: 'نوبت یافت نشد' }, { status: 404 });
  }

  if (existingSlot.isReserved) {
    return Response.json({ error: 'این نوبت متاسفانه پر شده است.' }, { status: 400 });
  }

  // ۳. آپدیت وضعیت به رزرو شده
  existingSlot.isReserved = true;
  await existingSlot.save();

  return Response.json({ success: true });
}