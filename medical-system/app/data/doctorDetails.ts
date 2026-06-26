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

// اطلاعات کامل 8 دکتر
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
    about: 'دارای بورد تخصصی بیماری های نوزادان و کودکان درمان اختلالات گوارشی و الرژیک نوزادان و کودکان اختلالات رشد و نمو نوزادان و کودکان اختلال رشد و بلوغ نوجوانان در مطب سونوگرافی شکم، تست حساسیت به کازیین شیر، تست حساسیت به لاکتوز شیر، تست تنفسی ( اسپیرومتری )، حضور دستیار کارشناس ارشد مشاور کودکان و نوجوانان جهت راهنمایی های تکمیلی و پاسخدهی به پرسش های مراجعین انجام می شود. سابقه فعالیت بیش از ۲۰ سال.',
    website: 'drZahravaraste.ir',
    phone: '۰۲۱-۱۲۴ ۵۷۶۷',
    instagram: 'instagram.com/dr.zahravaraste',
    availableTimes: ['۹:۵', '۹:۳۰', '۹:۴۵', '۱۰:۰۰', '۱۰:۱۵', '۱:۳۰', '۱۰:۴۵', '۱۱:۰۰', '۱۱:۱۵'],
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
    about: 'متخصص مغز و اعصاب با بیش از ۱۵ سال سابقه در درمان بیماری‌های نورولوژیک. دارای فلوشیپ سکته مغزی و بیماری‌های حرکتی. انجام نوار مغز و عضله، تست‌های تشخیصی پیشرفته. مشاوره در زمینه سردردهای مزمن، صرع، پارکینسون و ام‌اس.',
    website: 'drAVarasteh.ir',
    phone: '۰۲۱-۸۸۷۷ ۶۶۵۵',
    instagram: 'instagram.com/dr.ali.varasteh',
    availableTimes: ['۸:۰۰', '۸:۳۰', '۹:۰۰', '۹:۳۰', '۱۰:۰۰', '۱۰:۳۰', '۱۱:۰۰', '۱۱:۳۰'],
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
    about: 'جراح عمومی و لاپاراسکوپیست با تجربه در انجام عمل‌های جراحی شکم، کیسه صفرا، آپاندیس و فتق. دارای بورد تخصصی جراحی عمومی از دانشگاه تهران. انجام جراحی‌های کم‌تهاجمی با دوره نقاهت کوتاه.',
    website: 'drHosseini.ir',
    phone: '۰۲۱-۲۳۳ ۴۵۵',
    instagram: 'instagram.com/dr.behnoush',
    availableTimes: ['۱۴:۰۰', '۱۴:۳۰', '۱۵:۰۰', '۱۵:۳۰', '۱۶:۰۰', '۱۶:۳۰', '۱۷:۰۰'],
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
    about: 'متخصص بیماری‌های ریه و تنفسی، فوق تخصص آسم و آلرژی. تشخیص و درمان بیماری‌های انسدادی ریه، عفونت‌های تنفسی، سل و سرطان ریه. انجام تست‌های عملکرد ریه و برونکوسکوپی.',
    website: 'drAliRad.ir',
    phone: '۰۲۱-۲۲۱۱ ۳۳۴۴',
    instagram: 'instagram.com/dr.alirad',
    availableTimes: ['۹:۰۰', '۹:۲۰', '۹:۴۰', '۱۰:۰۰', '۱۰:۲۰', '۱۰:۴۰', '۱۱:۰۰', '۱۱:۲۰', '۱۱:۴۰'],
  },
  // 5. دکتر لیلا ضغنه
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
    about: 'متخصص اطفال و نوزادان با تمرکز بر رشد و تکامل کودک. واکسیناسیون، مشاوره تغذیه، درمان بیماری‌های شایع کودکان. محیط مطب مناسب کودکان با تجهیزات کامل.',
    website: 'drZangheneh.ir',
    phone: '۰۲۱-۲۲۹۹ ۸۸۷',
    instagram: 'instagram.com/dr.lila.z',
    availableTimes: ['۱۶:۰۰', '۱۶:۳۰', '۱۷:۰۰', '۱۷:۳۰', '۱۸:۰۰', '۱۸:۳۰', '۱۹:۰۰'],
  },
  // 6. دکتر یاسر پناهی
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
    about: 'فوق تخصص روماتولوژی و بیماری‌های خودایمنی. درمان آرتریت روماتوئید، لوپوس، نقرس و بیماری‌های مفصلی. انجام تزریقات مفصلی و درمان‌های بیولوژیک.',
    website: 'drPanahi.ir',
    phone: '۰۲۱-۸۸۶۶ ۷۷۸۸',
    instagram: 'instagram.com/dr.yaser.p',
    availableTimes: ['۱۰:۰۰', '۱۰:۳۰', '۱۱:۰۰', '۱۱:۳۰', '۱۲:۰۰', '۱:۳۰'],
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
    about: 'متخصص گوش، حلق و بینی با تجربه در جراحی‌های سینوس، لوزه، adenoid و جراحی‌های زیبایی بینی. درمان اختلالات شنوایی، وزوز گوش و سرگیجه.',
    website: 'drSaadati.ir',
    phone: '۰۲۱-۸۸۵۵ ۴۴۳۳',
    instagram: 'instagram.com/dr.zahra.s',
    availableTimes: ['۱۵:۰۰', '۱۵:۲۰', '۱۵:۴۰', '۱۶:۰۰', '۱۶:۲۰', '۱۶:۴۰', '۱۷:۰۰', '۱۷:۲۰'],
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
    about: 'دندانپزشک با تخصص در ایمپلنت، لمینت و زیبایی دندان. انجام عصب‌کشی، پر کردن، جرم‌گیری و بلیچینگ. استفاده از جدیدترین تجهیزات دیجیتال دندانپزشکی.',
    website: 'drGorosi.ir',
    phone: '۲۱-۲۲۷۷ ۶۶۵۵',
    instagram: 'instagram.com/dr.mahan.g',
    availableTimes: ['۹:۰۰', '۱۰:۰۰', '۱۱:۰۰', '۱۲:۰۰', '۱۴:۰۰', '۱۵:۰۰', '۱۶:۰۰', '۱۷:۰۰'],
  },
];

// نظرات کاربران برای هر دکتر
export const allReviews: Review[] = [
  // نظرات دکتر زهرا وارسته (id: 1)
  { id: '1', doctorId: '1', userName: 'فاطمه', userImage: '/assets/fateme.jpg', date: '۱۴۰۳/۱۰/۲', rating: 4, comment: 'دکتر وارسته رو از اینستاگرام میشناختم و اینجا تونستم به راحتی نوبت رزرو کنم.' },
  { id: '2', doctorId: '1', userName: 'مهسا اردکانی', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱۰/۲۳', rating: 4, comment: 'نوبت گیری در سریعترین زمان ممکن انجام شد و واقعا برای من راضی کننده بود تشخیص پزشک هم عالی بود.' },
  { id: '3', doctorId: '1', userName: 'علی رضایی', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۱۰/۱۵', rating: 4, comment: 'پزشک با تجربه ای بودن و با صبوری تمام معاینه کردن و بیماری رو تشخیص دادند و با یه نوبت دارو تا حد خوبی بهبودی رو شاهد بودیم.' },
  { id: '4', doctorId: '1', userName: 'سارا محمدی', userImage: '/assets/sara.jpg', date: '۱۴۰۳/۱۰/۱۰', rating: 5, comment: 'بسیار راضی بودم از رفتار پزشک و کادر درمان. محیط مطب هم بسیار تمیز و مرتب بود.' },
  { id: '5', doctorId: '1', userName: 'رضا کریمی', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۱۰/۰۵', rating: 4, comment: 'تشخیص پزشک دقیق بود و درمان موثر. حتماً به دیگران هم پیشنهاد می‌کنم.' },

  // نظرات دکتر علی وارسته (id: 2)
  { id: '6', doctorId: '2', userName: 'مریم احمدی', userImage: '/assets/fateme.jpg', date: '۱۴۰۳/۱۰/۱۸', rating: 4, comment: 'دکتر وارسته با حوصله کامل معاینه کردند و توضیحات دقیقی دادند. بسیار راضی بودم.' },
  { id: '7', doctorId: '2', userName: 'حسین نوری', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۱۰/۱۲', rating: 3, comment: 'مطب شلوغ بود ولی خود پزشک عالی بودند. تشخیص درست و درمان مناسب.' },
  { id: '8', doctorId: '2', userName: 'نازنین صادقی', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱۰/۰۸', rating: 5, comment: 'بهترین متخصص مغز و اعصابی که تا حالا رفتم. بسیار دقیق و حرفه‌ای.' },
  { id: '9', doctorId: '2', userName: 'امیر رضوی', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۱۰/۰۲', rating: 4, comment: 'سردردهای مزمنم بعد از درمان دکتر وارسته خیلی بهتر شد. ممنون از ایشان.' },
  { id: '10', doctorId: '2', userName: 'لیلا کاظمی', userImage: '/assets/sara.jpg', date: '۱۴۰۳/۰۹/۲۸', rating: 4, comment: 'پزشک بسیار دلسوز و knowledgeable. محیط مطب هم آرامش‌بخش بود.' },

  // نظرات دکتر بهنوش حسینی (id: 3)
  { id: '11', doctorId: '3', userName: 'زهرا موسوی', userImage: '/assets/fateme.jpg', date: '۱۴۰۳/۱۰/۲', rating: 4, comment: 'عمل جراحی لاپاراسکوپی کیسه صفرا رو انجام دادم. دوره نقاهت خیلی کوتاه بود. عالی!' },
  { id: '12', doctorId: '3', userName: 'محمد تقوی', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۱۰/۱۵', rating: 4, comment: 'دکتر حسینی بسیار حرفه‌ای هستند. توضیحات قبل از عمل کامل و دقیق بود.' },
  { id: '13', doctorId: '3', userName: 'فاطمه رحیمی', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱۰/۱۰', rating: 3, comment: 'جراحی خوب بود ولی زمان انتظار در مطب طولانی بود.' },
  { id: '14', doctorId: '3', userName: 'علی محمدی', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۱۰/۰۵', rating: 5, comment: 'بهترین جراح عمومی که تا حالا دیدم. دست‌پخت عالی در جراحی!' },
  { id: '15', doctorId: '3', userName: 'سارا حسینی', userImage: '/assets/sara.jpg', date: '۱۴۰۳/۹/۳۰', rating: 4, comment: 'عمل فتق رو انجام دادم. همه چیز عالی پیش رفت. ممنون از دکتر حسینی.' },

  // نظرات دکتر علی راد (id: 4)
  { id: '16', doctorId: '4', userName: 'رضا اکبری', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۰/۲۰', rating: 4, comment: 'آسم من بعد از درمان دکتر راد خیلی کنترل شده. بسیار راضی هستم.' },
  { id: '17', doctorId: '4', userName: 'مریم صادقی', userImage: '/assets/fateme.jpg', date: '۱۴۰۳/۱۰/۱۵', rating: 4, comment: 'تست‌های تنفسی کامل انجام شد. تشخیص دقیق و درمان موثر.' },
  { id: '18', doctorId: '4', userName: 'حسین کریمی', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۱۰/۱۰', rating: 3, comment: 'پزشک خوبی هستند ولی مطب کمی دور از مرکز شهره.' },
  { id: '19', doctorId: '4', userName: 'نازنین رحیمی', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱۰/۰۵', rating: 5, comment: 'بعد از سال‌ها مشکل تنفسی، بالاخره درمان درست پیدا کردم. ممنون دکتر راد.' },
  { id: '20', doctorId: '4', userName: 'امیر نوری', userImage: '/assets/sara.jpg', date: '۱۴۰۳/۰۹/۲۸', rating: 4, comment: 'برونکوسکوپی رو با دقت انجام دادند. بسیار حرفه‌ای.' },

  // نظرات دکتر لیلا ضغنه (id: 5)
  { id: '21', doctorId: '5', userName: 'شیما محمدی', userImage: '/assets/fateme.jpg', date: '۱۴۳/۱۰/۱۸', rating: 4, comment: 'دکتر زنگنه با بچه‌ها خیلی خوب رفتار می‌کنه. دخترم اصلا نمی‌ترسه.' },
  { id: '22', doctorId: '5', userName: 'پریسا احمدی', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱۰/۱۲', rating: 4, comment: 'واکسیناسیون کامل و به موقع. مشاوره تغذیه هم عالی بود.' },
  { id: '23', doctorId: '5', userName: 'مهدی رضایی', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۱۰/۰۸', rating: 3, comment: 'پزشک خوبیه ولی زمان انتظار طولانی بود.' },
  { id: '24', doctorId: '5', userName: 'نگار کاظمی', userImage: '/assets/sara.jpg', date: '۱۴۰۳/۱۰/۰', rating: 5, comment: 'بهترین متخصص اطفال تهران. پسرم عاشق دکتر ضغنه‌ست!' },
  { id: '25', doctorId: '5', userName: 'سعید نوری', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۰۹/۲۵', rating: 4, comment: 'تشخیص به موقع عفونت گوش. درمان سریع و موثر.' },

  // نظرات دکتر یاسر پناهی (id: 6)
  { id: '26', doctorId: '6', userName: 'فاطمه زهرایی', userImage: '/assets/fateme.jpg', date: '۱۴۰۳/۱۰/۲۰', rating: 4, comment: 'آرتریت روماتوئیدم بعد از درمان دکتر پناهی خیلی بهتر شده.' },
  { id: '27', doctorId: '6', userName: 'احمد موسوی', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۱۰/۱', rating: 4, comment: 'تزریقات مفصلی رو با دقت انجام دادند. درد خیلی کمتر شد.' },
  { id: '28', doctorId: '6', userName: 'مریم تقوی', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱۰/۱۰', rating: 3, comment: 'پزشک knowledgeable هستند ولی نوبت‌دهی سخته.' },
  { id: '29', doctorId: '6', userName: 'رضا صادقی', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۱۰/۰۵', rating: 5, comment: 'بهترین روماتولوژیست. درمان لوپوس من عالی پیش رفت.' },
  { id: '30', doctorId: '6', userName: 'زهرا اکبری', userImage: '/assets/sara.jpg', date: '۱۴۰۳/۰۹/۲۸', rating: 4, comment: 'نقرس من بعد از درمان کنترل شد. ممنون دکتر پناهی.' },

  // نظرات دکتر زهرا سعادتی (id: 7)
  { id: '31', doctorId: '7', userName: 'علی رحیمی', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۱۰/۲', rating: 4, comment: 'عمل سینوس رو انجام دادم. نتیجه عالی بود. تنفسم خیلی بهتر شد.' },
  { id: '32', doctorId: '7', userName: 'سارا نوری', userImage: '/assets/fateme.jpg', date: '۱۴۰۳/۱۰/۱۵', rating: 4, comment: 'جراحی لوزه برای پسرم. همه چیز عالی پیش رفت.' },
  { id: '33', doctorId: '7', userName: 'محمد کاظمی', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۱۰/۱۰', rating: 3, comment: 'پزشک خوبیه ولی مطب شلوغه.' },
  { id: '34', doctorId: '7', userName: 'نازنین احمدی', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱/۰۵', rating: 5, comment: 'وزوز گوشم بعد از درمان دکتر سعادتی کاملا برطرف شد.' },
  { id: '35', doctorId: '7', userName: 'حسین صادقی', userImage: '/assets/sara.jpg', date: '۱۴۰۳/۰۹/۳۰', rating: 4, comment: 'جراحی بینی (رینوپلاستی) عالی بود. نتیجه طبیعی و زیبا.' },

  // نظرات دکتر ماهان گروسی (id: 8)
  { id: '36', doctorId: '8', userName: 'پریسا رحیمی', userImage: '/assets/fateme.jpg', date: '۱۴۰۳/۱۰/۲۰', rating: 4, comment: 'لمینت دندان‌هام رو دکتر گروسی انجام داد. نتیجه فوق‌العاده!' },
  { id: '37', doctorId: '8', userName: 'امیر تقوی', userImage: '/assets/ali.jpg', date: '۱۴۰۳/۱۰/۱', rating: 4, comment: 'ایمپلنت دندان. کار بسیار تمیز و حرفه‌ای. بدون درد.' },
  { id: '38', doctorId: '8', userName: 'مریم نوری', userImage: '/assets/mahsa.jpg', date: '۱۴۰۳/۱۰/۱۰', rating: 3, comment: 'دندانپزشک خوبیه ولی هزینه‌ها کمی بالاست.' },
  { id: '39', doctorId: '8', userName: 'رضا کاظمی', userImage: '/assets/reza.jpg', date: '۱۴۰۳/۱۰/۰', rating: 5, comment: 'بهترین دندانپزشکی که تا حالا رفتم. بلیچینگ عالی بود.' },
  { id: '40', doctorId: '8', userName: 'فاطمه احمدی', userImage: '/assets/sara.jpg', date: '۱۴۰۳/۰۹/۲۸', rating: 4, comment: 'عصب‌کشی بدون درد. تجهیزات مدرن و محیط تمیز.' },
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