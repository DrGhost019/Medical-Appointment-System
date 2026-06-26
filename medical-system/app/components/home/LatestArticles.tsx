// src/components/home/LatestArticles.tsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import ArticleCard from './ArticleCard';

const LatestArticles = () => {
  const articles = [
    {
      id: '1',
      imageSrc: '/assets/heartproblems.png',
      title: '۱۰ نشانه هشدار دهنده مشکلات قلبی',
      excerpt: 'اگر این ۱۰ نشانه را در خود مشاهده کردید، حتماً به پزشک مراجعه کنید. مشکلات قلبی می‌توانند علائم مختلفی داشته باشند که شناخت آن‌ها بسیار مهم است.',
      date: '۱۴۰۳/۰۸/۰۵',
    },
    {
      id: '2',
      imageSrc: '/assets/insulin.png',
      title: '۵ گام ساده برای پیشگیری از دیابت',
      excerpt: 'با رعایت این ۵ گام ساده می‌توانید از ابتلا به دیابت نوع ۲ پیشگیری کنید. سبک زندگی سالم و تغذیه مناسب نقش کلیدی در این زمینه دارد.',
      date: '۱۴۰۳/۰۸/۱۰',
    },
    {
      id: '3',
      imageSrc: '/assets/doctorsinterview.png',
      title: 'چگونه بهترین دکتر را برای نیازهای خود انتخاب کنیم؟',
      excerpt: 'انتخاب پزشک مناسب یکی از مهم‌ترین تصمیمات سلامت شماست. در این مقاله به بررسی معیارهای مهم برای انتخاب پزشک می‌پردازیم.',
      date: '۱۴۰۳/۰۸/۱۵',
    },
  ];

  return (
    <section className="w-full bg-white py-6">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Main Container */}
        <div className="w-[1216px] mx-auto flex flex-col gap-[18px]">
          
          {/* Header: Title + View All Button */}
          <div className="w-full h-[40px] flex items-center justify-between pr-2">
            <h2 className="font-vazirmatn font-medium text-[24px] leading-[100%] text-[#2E2E2E]">
              آخرین مقالات
            </h2>
            <button className="flex items-center gap-1 text-[#666666] font-vazirmatn font-normal text-sm hover:text-primary-500 transition-colors">
              مشاهده همه
              <ChevronLeft size={16} />
            </button>
          </div>

          {/* Articles Cards */}
          <div className="w-full flex items-center gap-4">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                imageSrc={article.imageSrc}
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default LatestArticles;