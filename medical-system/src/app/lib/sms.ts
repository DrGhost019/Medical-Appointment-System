/**
 * تابع ارسال کد OTP از طریق پنل SMS.ir
 * @param phone شماره موبایل مقصد (مثال: 09123456789)
 * @param code کد تایید تولید شده (مثال: 48291)
 */
export async function sendOtpSms(phone: string, code: string): Promise<boolean> {
  const apiKey = process.env.SMS_API_KEY;
  const templateId = process.env.SMS_TEMPLATE_ID;

  if (!apiKey || !templateId) {
    console.error('❌ کلیدهای SMS_API_KEY یا SMS_TEMPLATE_ID در فایل env تنظیم نشده‌اند.');
    return false;
  }

  try {
    const response = await fetch('https://api.sms.ir/v1/send/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({
        mobile: phone,
        templateId: Number(templateId),
        parameters: [
          {
            name: 'Code', // نام متغیری که در قالب SMS.ir تعریف کرده‌اید (مثلا Code یا VerificationCode)
            value: code,
          },
        ],
      }),
    });

    const data = await response.json();

    // بررسی اینکه آیا ارسال با موفقیت انجام شده یا خیر (طبق داکیومنت sms.ir استاتوس 1 نشانه موفقیت است)
    if (response.ok && data.status === 1) {
      console.log(`✅ پیامک رمز یکبار مصرف با موفقیت به شماره ${phone} ارسال شد.`);
      return true;
    } else {
      console.error('❌ خطا در پاسخ پنل SMS.ir:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ خطا در ارتباط با سرور SMS.ir:', error);
    return false;
  }
}