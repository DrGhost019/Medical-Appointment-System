// src/data/doctorDetails.ts

export interface DoctorDetail {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  image: string;
  medicalCode: string;
  address: string;
  firstAvailable: string;
  about: string;
  website: string;
  phone: string;
  instagram: string;
  availableTimes: string[];
  // 👈 فیلدهای ضروری برای کار کردن فیلترهای سایدبار اضافه شدند
  gender: 'male' | 'female'; // جنسیت: male (آقا)، female (خانم)
  insurances: string[]; // بیمه‌های طرف قرارداد
  experienceYears: number; // سال‌های تجربه کاری (عدد)
  isOnline: boolean; // آیا الان آنلاین است؟
  canInPerson: boolean; // آیا امکان ویزیت حضوری دارد؟
}

export interface Review {
  id: string;
  doctorId: string;
  userName: string;
  userImage: string;
  date: string;
  rating: number;
  comment: string;
}

// اطلاعات کامل و تکمیل‌شده ۸ دکتر با تمام فیلترهای لازم
export const allDoctors: DoctorDetail[] = [
  // 1. دکتر زهرا وارسته
  {
    id: '1',
    name: 'دکتر زهرا وارسته',
    specialty: 'متخصص قلب و عروق',
    rating: 4.0,
    reviewCount: 105,
    image: '/assets/zahravarasteh.png',
    medicalCode: '۴۰۲۳',
    address: 'تهران، ستارخان، خیابان هفتم، پلاک ۴۰',
    firstAvailable: 'دوشنبه ۲۴ دی',
    about: 'متخصص قلب و عروق با بیش از ۲۰ سال سابقه فعالیت.',
    website: 'drZahravaraste.ir',
    phone: '۰۲۱-۱۲۴ ۵۷۶۷',
    instagram: 'instagram.com/dr.zahravaraste',
    availableTimes: ['۹:۵', '۹:۳۰', '۹:۴۵', '۱۰:۰۰', '۱۰:۱۵', '۱:۳۰', '۱۰:۴۵', '۱۱:۰۰', '۱۱:۱۵'],
    // 👈 اضافه شدن اطلاعات فیلتر
    gender: 'female',
    insurances: ['تأمین اجتماعی', 'بیمه نیروهای مسلح'],
    experienceYears: 22,
    isOnline: true,
    canInPerson: true,
  },
  // 2. دکتر علی وارسته
  {
    id: '2',
    name: 'دکتر علی وارسته',
    specialty: 'متخصص مغز و اعصاب',
    rating: 3.5,
    reviewCount: 105,
    image: '/assets/alivarasteh.png',
    medicalCode: '۵۱۲۳۴',
    address: 'تهران، ونک، خیابان ملاصدرا، پلاک ۱۵',
    firstAvailable: 'سه‌شنبه ۲۵ دی',
    about: 'متخصص مغز و اعصاب با بیش از ۱۵ سال سابقه.',
    website: 'drAVarasteh.ir',
    phone: '۰۲۱-۸۸۷۷ ۶۶55',
    instagram: 'instagram.com/dr.ali.varasteh',
    availableTimes: ['۸:۰۰', '۸:۳۰', '۹:۰۰', '۹:۳۰', '۱۰:۰۰', '۱۰:۳0', '۱۱:۰۰', '۱۱:۳۰'],
    // 👈 اضافه شدن اطلاعات فیلتر
    gender: 'male',
    insurances: ['بیمه سلامت', 'بیمه ایران'],
    experienceYears: 18,
    isOnline: true,
    canInPerson: true,
  },
  // 3. دکتر بهنوش حسینی
  {
    id: '3',
    name: 'دکتر بهنوش حسینی',
    specialty: 'جراح عمومی',
    rating: 3.5,
    reviewCount: 105,
    image: '/assets/behnoshhosieni.png',
    medicalCode: '۶۲۳۴',
    address: 'تهران، سعادت‌آباد، بلوار دریا، پلاک ۲۲',
    firstAvailable: 'چهارشنبه ۶ دی',
    about: 'جراح عمومی و لاپاراسکوپیست با تجربه.',
    website: 'drHosseini.ir',
    phone: '۰۲۱-۲۳۳ ۴۵۵',
    instagram: 'instagram.com/dr.behnoush',
    availableTimes: ['۱۴:۰۰', '۱۴:۳۰', '۱۵:۰۰', '۱۵:۳۰', '۱۶:۰۰', '۱۶:۳۰', '۱۷:۰۰'],
    // 👈 اضافه شدن اطلاعات فیلتر
    gender: 'female',
    insurances: ['تأمین اجتماعی', 'بیمه ایران'],
    experienceYears: 12,
    isOnline: false,
    canInPerson: true,
  },
  // 4. دکتر علی راد
  {
    id: '4',
    name: 'دکتر علی راد',
    specialty: 'متخصص ریه',
    rating: 3.5,
    reviewCount: 105,
    image: '/assets/alirad.png',
    medicalCode: '۷۳۴۵۶',
    address: 'تهران، تجریش، خیابان شریعتی، پلاک ۸۸',
    firstAvailable: 'پنجشنبه ۲۷ دی',
    about: 'متخصص بیماری‌های ریه و تنفسی.',
    website: 'drAliRad.ir',
    phone: '۰۲۱-۲۲۱۱ ۳۳۴۴',
    instagram: 'instagram.com/dr.alirad',
    availableTimes: ['۹:۰۰', '۹:۲۰', '۹:۴۰', '۱۰:۰۰', '۱۰:۲۰', '۱۰:۴۰', '۱۱:۰۰', '۱۱:۲۰', '۱۱:۴۰'],
    // 👈 اضافه شدن اطلاعات فیلتر
    gender: 'male',
    insurances: ['بیمه نیروهای مسلح', 'بیمه آسیا'],
    experienceYears: 25,
    isOnline: false,
    canInPerson: true,
  },
  // 5. دکتر لیلا زنگنه
  {
    id: '5',
    name: 'دکتر لیلا زنگنه',
    specialty: 'متخصص اطفال',
    rating: 3.5,
    reviewCount: 105,
    image: '/assets/lilazangheneh.png',
    medicalCode: '۴۵۶۷',
    address: 'تهران، پاسداران، خیابان گلستان، پلاک ۱۲',
    firstAvailable: 'شنبه ۳۰ دی',
    about: 'متخصص اطفال و نوزادان.',
    website: 'drZangheneh.ir',
    phone: '۰۲۱-۲۲۹۹ ۸۸۷',
    instagram: 'instagram.com/dr.lila.z',
    availableTimes: ['۱۶:۰۰', '۱۶:۳۰', '۱۷:۰۰', '۱۷:۳۰', '۱۸:۰۰', '۱۸:۳۰', '۱۹:۰۰'],
    // 👈 اضافه شدن اطلاعات فیلتر
    gender: 'female',
    insurances: ['تأمین اجتماعی', 'بیمه سلامت'],
    experienceYears: 9,
    isOnline: true,
    canInPerson: true,
  },
  // 6. دکتر یاشار پناهی
  {
    id: '6',
    name: 'دکتر یاشار پناهی',
    specialty: 'متخصص روماتولوژی',
    rating: 3.5,
    reviewCount: 100,
    image: '/assets/yasharpanahi.png',
    medicalCode: '۹۵۶۷۸',
    address: 'تهران، یوسف‌آباد، خیابان سیدجمال‌الدین، پلاک ۳۳',
    firstAvailable: 'یکشنبه ۱ بهمن',
    about: 'فوق تخصص روماتولوژی و بیماری‌های خودایمنی.',
    website: 'drPanahi.ir',
    phone: '۰۲۱-۸۸۶۶ ۷۷۸۸',
    instagram: 'instagram.com/dr.yaser.p',
    availableTimes: ['۱۰:۰۰', '۱۰:۳۰', '۱۱:۰۰', '۱۱:۳۰', '۱۲:۰۰', '۱:۳۰'],
    // 👈 اضافه شدن اطلاعات فیلتر
    gender: 'male',
    insurances: ['تأمین اجتماعی', 'بیمه نیروهای مسلح', 'بیمه ایران'],
    experienceYears: 16,
    isOnline: true,
    canInPerson: false, // فقط ویزیت آنلاین
  },
  // 7. دکتر زهرا سعادتی
  {
    id: '7',
    name: 'دکتر زهرا سعادتی',
    specialty: 'متخصص گوش و حلق و بینی',
    rating: 3.5,
    reviewCount: 250,
    image: '/assets/zahrasaadati.png',
    medicalCode: '۱۰۶۷۸۹',
    address: 'تهران، شهرک غرب، بلوار فرحزادی، پلاک ۵۵',
    firstAvailable: 'دوشنبه ۲ بهمن',
    about: 'متخصص گوش، حلق و بینی.',
    website: 'drSaadati.ir',
    phone: '۰۲۱-۸۸55 ۴۴۳۳',
    instagram: 'instagram.com/dr.zahra.s',
    availableTimes: ['۱۵:۰۰', '۱۵:۲۰', '۱۵:۴۰', '۱۶:۰۰', '۱۶:۲۰', '۱۶:۴۰', '۱۷:۰۰', '۱۷:۲۰'],
    // 👈 اضافه شدن اطلاعات فیلتر
    gender: 'female',
    insurances: ['بیمه سلامت', 'بیمه ایران', 'بیمه آسیا'],
    experienceYears: 20,
    isOnline: false,
    canInPerson: true,
  },
  // 8. دکتر ماهان گروسی
  {
    id: '8',
    name: 'دکتر ماهان گروسی',
    specialty: 'دندانپزشک',
    rating: 3.5,
    reviewCount: 250,
    image: '/assets/mahangorosi.png',
    medicalCode: '۱۱۷۸۹۰',
    address: 'تهران، الهیه، خیابان فرشته، پلاک ۹۰ ',
    firstAvailable: 'سه‌شنبه ۳ بهمن',
    about: 'دندانپزشک با تخصص در ایمپلنت و زیبایی.',
    website: 'drGorosi.ir',
    phone: '۲۱-۲۲۷۷ ۶۶55',
    instagram: 'instagram.com/dr.mahan.g',
    availableTimes: ['۹:۰۰', '۱۰:۰۰', '۱۱:۰۰', '۱۲:۰۰', '۱۴:۰۰', '۱۵:۰۰', '۱۶:۰۰', '۱۷:۰۰'],
    // 👈 اضافه شدن اطلاعات فیلتر
    gender: 'male',
    insurances: ['بیمه ایران', 'بیمه آسیا'],
    experienceYears: 14,
    isOnline: true,
    canInPerson: true,
  },
];

// نظرات کاربران برای هر دکتر
export const allReviews: Review[] = [
  // نظرات دکتر زهرا وارسته (id: 1)
  { id: '1', doctorId: '1', userName: 'فاطمه', userImage: '/assets/fateme.jpg', date: '۱۴۰۳/۱۰/۲', rating: 4, comment: 'دکتر وارسته رو از اینستاگرام میشناختم و اینجا تونستم به راحتی نوبت رزرو کنم.' },
  { id: '2', doctorId: '1', userName: 'مهسا اردکانی', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱۰/۲۳', rating: 4, comment: 'نوبت گیری در سریعترین زمان ممکن انجام شد.' },
  { id: '3', doctorId: '1', userName: 'علی رضایی', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۱۰/۱۵', rating: 4, comment: 'پزشک با تجربه ای بودن و با صبوری تمام معاینه کردن.' },
  { id: '4', doctorId: '1', userName: 'سارا محمدی', userImage: '/assets/sara.jpg', date: '۱۴۰۳/۱۰/۱۰', rating: 5, comment: 'بسیار راضی بودم از رفتار پزشک و کادر درمان.' },
  { id: '5', doctorId: '1', userName: 'رضا کریمی', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۱۰/۰۵', rating: 4, comment: 'تشخیص پزشک دقیق بود و درمان موثر.' },

  // نظرات دکتر علی وارسته (id: 2)
  { id: '6', doctorId: '2', userName: 'مریم احمدی', userImage: '/assets/fateme.jpg', date: '۱۴۰۳/۱۰/۱۸', rating: 4, comment: 'دکتر وارسته با حوصله کامل معاینه کردند.' },
  { id: '7', doctorId: '2', userName: 'حسین نوری', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۱۰/۱۲', rating: 3, comment: 'مطب شلوغ بود ولی خود پزشک عالی بودند.' },
  { id: '8', doctorId: '2', userName: 'نازنین صادقی', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱۰/۰۸', rating: 5, comment: 'بهترین متخصص مغز و اعصابی که تا حالا رفتم.' },
  { id: '9', doctorId: '2', userName: 'امیر رضوی', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۱۰/۰۲', rating: 4, comment: 'سردردهای مزمنم خیلی بهتر شد.' },
  { id: '10', doctorId: '2', userName: 'لیلا کاظمی', userImage: '/assets/sara.jpg', date: '۱۴۰۳/۰۹/۲۸', rating: 4, comment: 'پزشک بسیار دلسوز و knowledgeable.' },

  // نظرات دکتر بهنوش حسینی (id: 3)
  { id: '11', doctorId: '3', userName: 'زهرا موسوی', userImage: '/assets/fateme.jpg', date: '۱۴۰۳/۱۰/۲', rating: 4, comment: 'عمل جراحی لاپاراسکوپی کیسه صفرا رو انجام دادم.' },
  { id: '12', doctorId: '3', userName: 'محمد تقوی', userImage: '/assets/ali.jpg', date: '۱۴۰3/۱۰/۱۵', rating: 4, comment: 'دکتر حسینی بسیار حرفه‌ای هستند.' },
  { id: '13', doctorId: '3', userName: 'فاطمه رحیمی', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱۰/۱۰', rating: 3, comment: 'جراحی خوب بود ولی زمان انتظار در مطب طولانی بود.' },
  { id: '14', doctorId: '3', userName: 'علی محمدی', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۱۰/۰۵', rating: 5, comment: 'بهترین جراح عمومی که تا حالا دیدم.' },
  { id: '15', doctorId: '3', userName: 'سارا حسینی', userImage: '/assets/sara.jpg', date: '۱۴۰3/9/۳۰', rating: 4, comment: 'عمل فتق رو انجام دادم. همه چیز عالی پیش رفت.' },

  // نظرات دکتر علی راد (id: 4)
  { id: '16', doctorId: '4', userName: 'رضا اکبری', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۰/۲۰', rating: 4, comment: 'آسم من خیلی کنترل شده.' },
  { id: '17', doctorId: '4', userName: 'مریم صادقی', userImage: '/assets/fateme.jpg', date: '۱۴۰۳/۱۰/۱۵', rating: 4, comment: 'تشخیص دقیق و درمان موثر.' },
  { id: '18', doctorId: '4', userName: 'حسین کریمی', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۱۰/۱۰', rating: 3, comment: 'پزشک خوبی هستند.' },
  { id: '19', doctorId: '4', userName: 'نازنین رحیمی', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱۰/۰۵', rating: 5, comment: 'بالاخره درمان درست پیدا کردم.' },
  { id: '20', doctorId: '4', userName: 'امیر نوری', userImage: '/assets/sara.jpg', date: '۱۴۰3/۰۹/۲۸', rating: 4, comment: 'برونکوسکوپی رو با دقت انجام دادند.' },

  // نظرات دکتر لیلا زنگنه (id: 5)
  { id: '21', doctorId: '5', userName: 'شیما محمدی', userImage: '/assets/fateme.jpg', date: '۱۴۳/۱۰/۱۸', rating: 4, comment: 'دکتر زنگنه با بچه‌ها خیلی خوب رفتار می‌کنه.' },
  { id: '22', doctorId: '5', userName: 'پریسا احمدی', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱۰/۱۲', rating: 4, comment: 'واکسیناسیون کامل و به موقع.' },
  { id: '23', doctorId: '5', userName: 'مهدی رضایی', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۱۰/۰۸', rating: 3, comment: 'زمان انتظار طولانی بود.' },
  { id: '24', doctorId: '5', userName: 'نگار کاظمی', userImage: '/assets/sara.jpg', date: '۱۴۰۳/۱۰/۰', rating: 5, comment: 'پسرم عاشق دکتر زنگنه‌ست!' },
  { id: '25', doctorId: '5', userName: 'سعید نوری', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۰۹/۲۵', rating: 4, comment: 'تشخیص به موقع عفونت گوش.' },

  // نظرات دکتر یاشار پناهی (id: 6)
  { id: '26', doctorId: '6', userName: 'فاطمه زهرایی', userImage: '/assets/fateme.jpg', date: '۱۴۰3/۱۰/۲۰', rating: 4, comment: 'آرتریت روماتوئیدم خیلی بهتر شده.' },
  { id: '27', doctorId: '6', userName: 'احمد موسوی', userImage: '/assets/ali.jpg', date: '۱۴۰3/۱۰/۱', rating: 4, comment: 'تزریقات مفصلی رو با دقت انجام دادند.' },
  { id: '28', doctorId: '6', userName: 'مریم تقوی', userImage: '/assets/mahsa.jpg', date: '۱۴۰3/۱۰/۱۰', rating: 3, comment: 'نوبت‌دهی سخته.' },
  { id: '29', doctorId: '6', userName: 'رضا صادقی', userImage: '/assets/reza.jpg', date: '۱۴۰3/۱۰/۰۵', rating: 5, comment: 'بهترین روماتولوژیست.' },
  { id: '30', doctorId: '6', userName: 'زهرا اکبری', userImage: '/assets/sara.jpg', date: '۱۴۰3/۰۹/۲۸', rating: 4, comment: 'نقرس من کنترل شد.' },

  // نظرات دکتر زهرا سعادتی (id: 7)
  { id: '31', doctorId: '7', userName: 'علی رحیمی', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۱۰/۲', rating: 4, comment: 'عمل سینوس رو انجام دادم.' },
  { id: '32', doctorId: '7', userName: 'سارا نوری', userImage: '/assets/fateme.jpg', date: '۱۴۰۳/۱۰/۱۵', rating: 4, comment: 'جراحی لوزه برای پسرم. همه چیز عالی پیش رفت.' },
  { id: '33', doctorId: '7', userName: 'محمد کاظمی', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۱۰/۱۰', rating: 3, comment: 'مطب شلوغه.' },
  { id: '34', doctorId: '7', userName: 'نازنین احمدی', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱/۰۵', rating: 5, comment: 'وزوز گوشم کاملا برطرف شد.' },
  { id: '35', doctorId: '7', userName: 'حسین صادقی', userImage: '/assets/sara.jpg', date: '۱۴۰3/۰۹/۳۰', rating: 4, comment: 'جراحی بینی (رینوپلاستی) عالی بود.' },

  // نظرات دکتر ماهان گروسی (id: 8)
  { id: '36', doctorId: '8', userName: 'پریسا رحیمی', userImage: '/assets/fateme.jpg', date: '۱۴۰۳/۱۰/۲۰', rating: 4, comment: 'لمینت دندان‌هام رو انجام دادم. نتیجه فوق‌العاده!' },
  { id: '37', doctorId: '8', userName: 'امیر تقوی', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۱۰/۱', rating: 4, comment: 'ایمپلنت دندان. کار بسیار تمیز و حرفه‌ای.' },
  { id: '38', doctorId: '8', userName: 'مریم نوری', userImage: '/assets/mahsa.jpg', date: '۱۴۰3/۱۰/۱۰', rating: 3, comment: 'هزینه‌ها کمی بالاست.' },
  { id: '39', doctorId: '8', userName: 'رضا کاظمی', userImage: '/assets/reza.jpg', date: '۱۴۰3/۱۰/۰', rating: 5, comment: 'بهترین دندانپزشکی که تا حالا رفتم.' },
  { id: '40', doctorId: '8', userName: 'فاطمه احمدی', userImage: '/assets/sara.jpg', date: '۱۴۰3/۰۹/۲۸', rating: 4, comment: 'عصب‌کشی بدون درد. تجهیزات مدرن.' },
];

// Helper function برای پیدا کردن پزشک بر اساس ID
export const getDoctorById = (id: string): DoctorDetail | undefined => {
  return allDoctors.find(doctor => doctor.id === id);
};

// Helper function برای پیدا کردن نظرات یک پزشک
export const getReviewsByDoctorId = (doctorId: string): Review[] => {
  return allReviews.filter(review => review.doctorId === doctorId);
};

// Export برای سازگاری با کد قبلی
export const doctorZahraVarasteh = allDoctors[0];
export const doctorZahraReviews = getReviewsByDoctorId('1');