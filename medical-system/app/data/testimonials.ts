import { Testimonial } from '@/types/doctor';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    userName: 'حسن احمدی',
    userImage: '/images/users/user1.jpg',
    rating: 5,
    date: '۱۴۰۳/۰۸/۰',
    comment: 'دکتر عالی بودند و تشخیصشان درست بود. رزو خوب شد.',
    doctorName: 'دکتر علی راد',
  },
  {
    id: '2',
    userName: 'مینا رضایی',
    userImage: '/images/users/user2.jpg',
    rating: 5,
    date: '۱۴۰۳/۰۸/۱۸',
    comment: 'تجربه بسیار خوبی بود. پزشک با حوصله و دقیق بودند.',
    doctorName: 'دکتر فاطمه حسینی',
  },
  {
    id: '3',
    userName: 'رضا محمدی',
    userImage: '/images/users/user3.jpg',
    rating: 4,
    date: '۱۴۰۳/۰۸/۱۵',
    comment: 'نوبت‌دهی سریع و راحت بود. پیشنهاد می‌کنم.',
    doctorName: 'دکتر محمد رضایی',
  },
];