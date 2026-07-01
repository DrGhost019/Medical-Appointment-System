// src/app/page.tsx
import Header from './components/layout/Header';
import HeroSection from './components/home/HeroSection';
import SearchSection from './components/home/SearchSection';
import SpecialtiesList from './components/home/SpecialtiesList';
import PopularDoctors from './components/home/PopularDoctors';
import HealthTest from './components/home/HealthTest';
import NewestDoctors from './components/home/NewestDoctors';
import Testimonials from './components/home/Testimonials';
import FAQList from './components/faq/FAQList';        // ✅ تغییر به کامپوننت جدید
import LatestArticles from './components/home/LatestArticles';
import Footer from './components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Header />
      <HeroSection />
      <SearchSection />
      <SpecialtiesList />
      <PopularDoctors />
      <HealthTest />
      <NewestDoctors />
      <Testimonials />
      <FAQList />           {/* ✅ استفاده از کامپوننت جدید */}
      <LatestArticles />
      <Footer />
    </main>
  );
}