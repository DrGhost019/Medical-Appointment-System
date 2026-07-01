import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import connectDB from '../src/app/lib/db';
import Doctor from '../src/app/models/Doctor';
import Slot from '../src/app/models/Slot';
import User from '../src/app/models/User';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    console.log('🔄 Connecting to database...');
    await connectDB();

    console.log('️ Clearing existing data...');
    await Doctor.deleteMany({});
    await Slot.deleteMany({});
    await User.deleteMany({});

    const doctorsData = [
      {
        _id: "667ec111fa293c0000000011",
        name: "دکتر زهرا وارسته",
        specialty: "متخصص قلب و عروق",
        rating: 4,
        reviewCount: 105,
        image: "/assets/zahravarasteh.png",
        medicalCode: "4023",
        address: "تهران، ستارخان، خیابان هفتم، پلاک 40",
        firstAvailable: "دوشنبه 24 دی",
        about: "متخصص قلب و عروق با بیش از 20 سال سابقه فعالیت.",
        website: "drZahravaraste.ir",
        phone: "09121234567",
        instagram: "instagram.com/dr.zahravaraste",
        gender: "female",
        insurances: ["تأمین اجتماعی", "بیمه نیروهای مسلح"],
        experienceYears: 22,
        isOnline: true,
        canInPerson: true,
        passwordHash: await bcrypt.hash("123456", 10),
      },
      {
        _id: "667ec111fa293c0000000012",
        name: "دکتر علی وارسته",
        specialty: "متخصص مغز و اعصاب",
        rating: 3.5,
        reviewCount: 98,
        image: "/assets/alivarasteh.png",
        medicalCode: "5123",
        address: "تهران، خیابان ولیعصر، پلاک 15",
        firstAvailable: "سه‌شنبه 25 دی",
        about: "متخصص مغز و اعصاب با بیش از 15 سال سابقه.",
        website: "drAlivarasteh.ir",
        phone: "09121234568",
        instagram: "instagram.com/dr.alivaraste",
        gender: "male",
        insurances: ["تأمین اجتماعی"],
        experienceYears: 15,
        isOnline: true,
        canInPerson: true,
        passwordHash: await bcrypt.hash("123456", 10),
      },
      {
        _id: "667ec111fa293c0000000013",
        name: "دکتر بهنوش حسینی",
        specialty: "جراح عمومی",
        rating: 4.9,
        reviewCount: 98,
        image: "/assets/behnoshhosieni.png",
        medicalCode: "5124",
        address: "تهران، خیابان شریعتی، پلاک 8",
        firstAvailable: "چهارشنبه 26 دی",
        about: "جراح عمومی با بیش از 18 سال سابقه.",
        website: "drBehnosh.ir",
        phone: "09121234569",
        instagram: "instagram.com/dr.behnosh",
        gender: "female",
        insurances: ["تأمین اجتماعی", "بیمه سلامت"],
        experienceYears: 18,
        isOnline: true,
        canInPerson: true,
        passwordHash: await bcrypt.hash("123456", 10),
      },
      {
        _id: "667ec111fa293c0000000014",
        name: "دکتر علی راد",
        specialty: "متخصص ریه",
        rating: 4.8,
        reviewCount: 124,
        image: "/assets/alirad.png",
        medicalCode: "5125",
        address: "تهران، خیابان سهروردی، پلاک 20",
        firstAvailable: "پنجشنبه 27 دی",
        about: "متخصص ریه با بیش از 20 سال سابقه.",
        website: "drAliRad.ir",
        phone: "09121234570",
        instagram: "instagram.com/dr.alirad",
        gender: "male",
        insurances: ["بیمه سلامت"],
        experienceYears: 20,
        isOnline: true,
        canInPerson: true,
        passwordHash: await bcrypt.hash("123456", 10),
      },
      {
        _id: "667ec111fa293c0000000015",
        name: "دکتر لیلا زنگنه",
        specialty: "متخصص اطفال",
        rating: 4.9,
        reviewCount: 203,
        image: "/assets/lilazangheneh.png",
        medicalCode: "5126",
        address: "تهران، خیابان پاسداران، پلاک 30",
        firstAvailable: "شنبه 29 دی",
        about: "متخصص اطفال با بیش از 25 سال سابقه.",
        website: "drLeilaZangeneh.ir",
        phone: "09121234571",
        instagram: "instagram.com/dr.leilazangeneh",
        gender: "female",
        insurances: ["تأمین اجتماعی", "بیمه سلامت", "بیمه نیروهای مسلح"],
        experienceYears: 25,
        isOnline: true,
        canInPerson: true,
        passwordHash: await bcrypt.hash("123456", 10),
      },
      {
        _id: "667ec111fa293c0000000016",
        name: "دکتر یاشار پناهی",
        specialty: "متخصص روماتولوژی",
        rating: 4.6,
        reviewCount: 45,
        image: "/assets/yasharpanahi.png",
        medicalCode: "5127",
        address: "تهران، خیابان جردن، پلاک 12",
        firstAvailable: "دوشنبه 1 بهمن",
        about: "متخصص روماتولوژی با بیش از 10 سال سابقه.",
        website: "drYasharPanahi.ir",
        phone: "09121234572",
        instagram: "instagram.com/dr.yasharpanahi",
        gender: "male",
        insurances: ["تأمین اجتماعی"],
        experienceYears: 10,
        isOnline: true,
        canInPerson: true,
        passwordHash: await bcrypt.hash("123456", 10),
      },
      {
        _id: "667ec111fa293c0000000017",
        name: "دکتر زهرا سعادتی",
        specialty: "متخصص گوش و حلق و بینی",
        rating: 4.8,
        reviewCount: 67,
        image: "/assets/zahrasaadati.png",
        medicalCode: "5128",
        address: "تهران، خیابان نیاوران، پلاک 25",
        firstAvailable: "چهارشنبه 3 بهمن",
        about: "متخصص گوش و حلق و بینی با بیش از 12 سال سابقه.",
        website: "drZahraSaadati.ir",
        phone: "09121234573",
        instagram: "instagram.com/dr.zahrasaadati",
        gender: "female",
        insurances: ["بیمه سلامت"],
        experienceYears: 12,
        isOnline: true,
        canInPerson: true,
        passwordHash: await bcrypt.hash("123456", 10),
      },
      {
        _id: "667ec111fa293c0000000018",
        name: "دکتر ماهان گروسی",
        specialty: "دندانپزشک",
        rating: 4.9,
        reviewCount: 112,
        image: "/assets/mahangorosi.png",
        medicalCode: "5129",
        address: "تهران، خیابان الهیه، پلاک 45",
        firstAvailable: "پنجشنبه 4 بهمن",
        about: "دندانپزشک با بیش از 15 سال سابقه.",
        website: "drMahanGarousi.ir",
        phone: "09121234574",
        instagram: "instagram.com/dr.mahangarousi",
        gender: "male",
        insurances: ["تأمین اجتماعی", "بیمه سلامت"],
        experienceYears: 15,
        isOnline: true,
        canInPerson: true,
        passwordHash: await bcrypt.hash("123456", 10),
      },
    ];

    const slotsData = [
      { doctorId: "667ec111fa293c0000000011", date: "1403/10/24", time: "09:00 - 09:30", isReserved: false },
      { doctorId: "667ec111fa293c0000000011", date: "1403/10/24", time: "09:30 - 10:00", isReserved: false },
      { doctorId: "667ec111fa293c0000000011", date: "1403/10/24", time: "10:00 - 10:30", isReserved: false },
      { doctorId: "667ec111fa293c0000000011", date: "1403/10/24", time: "10:30 - 11:00", isReserved: false },
      { doctorId: "667ec111fa293c0000000011", date: "1403/10/24", time: "11:00 - 11:30", isReserved: false },
      { doctorId: "667ec111fa293c0000000011", date: "1403/10/24", time: "11:30 - 12:00", isReserved: false },
      { doctorId: "667ec111fa293c0000000011", date: "1403/10/24", time: "14:00 - 14:30", isReserved: false },
      { doctorId: "667ec111fa293c0000000011", date: "1403/10/24", time: "14:30 - 15:00", isReserved: false },
      { doctorId: "667ec111fa293c0000000011", date: "1403/10/24", time: "15:00 - 15:30", isReserved: false },
      { doctorId: "667ec111fa293c0000000011", date: "1403/10/24", time: "15:30 - 16:00", isReserved: false },
      { doctorId: "667ec111fa293c0000000011", date: "1403/10/24", time: "16:00 - 16:30", isReserved: false },
      { doctorId: "667ec111fa293c0000000011", date: "1403/10/24", time: "16:30 - 17:00", isReserved: false },
      { doctorId: "667ec111fa293c0000000012", date: "1403/10/24", time: "09:00 - 09:30", isReserved: false },
      { doctorId: "667ec111fa293c0000000012", date: "1403/10/24", time: "10:00 - 10:30", isReserved: false },
      { doctorId: "667ec111fa293c0000000012", date: "1403/10/24", time: "11:00 - 11:30", isReserved: false },
      { doctorId: "667ec111fa293c0000000012", date: "1403/10/24", time: "14:00 - 14:30", isReserved: false },
      { doctorId: "667ec111fa293c0000000012", date: "1403/10/24", time: "16:00 - 16:30", isReserved: false },
    ];

    console.log('👨‍⚕️ Seeding doctors...');
    await Doctor.insertMany(doctorsData);

    console.log('📅 Seeding slots...');
    await Slot.insertMany(slotsData);

    console.log('✅ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();