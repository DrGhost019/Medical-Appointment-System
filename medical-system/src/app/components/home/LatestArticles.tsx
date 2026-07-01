// src/components/home/LatestArticles.tsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import ArticleCard from './ArticleCard';
import connectDB from '../../lib/db';
import Article from '../../models/Article';
export const dynamic = 'force-dynamic';

export default async function LatestArticles() {
  await connectDB();
  const articlesFromDB = await Article.find({})
    .sort({ date: -1, createdAt: -1 })
    .limit(3)
    .lean();

  // دیتای پیش‌فرض در صورت خالی بودن دیتابیس
  const articles = articlesFromDB.length > 0 ? articlesFromDB : [
    {
      _id: '1',
      title: '۱۰ نشانه هشدار دهنده مشکلات قلبی',
      excerpt: 'اگر این ۱۰ نشانه را در خود مشاهده کردید، حتماً به پزشک مراجعه کنید...',
      image: '/assets/heartproblems.png',
      date: '۱۴۰۳/۰۸/۰۵',
    },
    {
      _id: '2',
      title: '۵ گام ساده برای پیشگیری از دیابت',
      excerpt: 'با رعایت این ۵ گام ساده می‌توانید از ابتلا به دیابت نوع ۲ پیشگیری کنید...',
      image: '/assets/insulin.png',
      date: '۱۴۰۳/۰۸/۱۰',
    },
    {
      _id: '3',
      title: 'چگونه بهترین دکتر را برای نیازهای خود انتخاب کنیم؟',
      excerpt: 'انتخاب پزشک مناسب یکی از مهم‌ترین تصمیمات سلامت شماست...',
      image: '/assets/doctorsinterview.png',
      date: '۱۴۰۳/۰۸/۱۵',
    },
  ];

  return (
    <section className="w-full bg-white py-6">
      <div className="max-w-[1440px] mx-auto">
        <div 
          className="mx-auto flex flex-col"
          style={{
            width: '1216px',
            gap: '18px',
          }}
        >
          {/* عنوان و دکمه مشاهده همه */}
          <div 
            className="w-full h-[40px] flex items-center justify-between"
            style={{ paddingRight: '2px' }}
          >
            <h2 className="font-vazirmatn font-medium text-[24px] leading-[100%] text-[#2E2E2E]">
              آخرین مقالات
            </h2>
            <button className="flex items-center gap-1 text-[#666666] font-vazirmatn font-normal text-sm hover:text-[#4179F0] transition-colors">
              مشاهده همه
              <ChevronLeft size={16} />
            </button>
          </div>

          {/* کارت‌های مقاله */}
          <div className="w-full flex items-center gap-4">
            {articles.map((article: any) => (
              <ArticleCard
                key={article._id?.toString() || article.id}
                imageSrc={article.image || article.avatar || '/assets/logo.png'}
                title={article.title}
                excerpt={article.excerpt || article.description || ''}
                date={article.date}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}