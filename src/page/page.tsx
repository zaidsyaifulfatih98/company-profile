import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import kopi1 from "../assets/kopi1.jpg"
import hero1 from "../assets/hero1.webp"
import hero2 from "../assets/hero2.webp"
import hero3 from "../assets/hero3.webp"
import { useProductsBackendless } from './useProductsCompany';
import { ensureCompanyBackendless, TestimonyStore, type TestimonyRecord } from '../lib/backendless';
import { Link } from 'react-router-dom';


type Testimony = {
  name: string;
  role: string;
  message: string;
  avatar: string;
};

const testimonies: Testimony[] = [
  {
    name: "Furi R",
    role: "Pelajar",
    avatar: "FR",
    message: `“ I always had good time with Anomali. Anomali brings local coffee for everyone who craving best coffee. My fav coffee bean come from Flores, and they also have much kind of beans like Jawa, Kintamani, Luwak, Toraha, Aceh Gayo, Flores and Black Pear.”`,
  },
  {
    name: "Didit",
    role: "Pegawai Swasta",
    avatar: "D",
    message: `“Barang sudah diterima dengan baik, packing aman. Rasa kopi mantap sesuai dengan selera. Recommend seller.”`,
  },
  {
    name: "Yayak",
    role: "Pengusaha",
    avatar: "Y",
    message: `“Kopinya enak dan rasanya konsisten, favorite pilihan keluarga. Lebih mantap lagi belinya pas promo 2/2 dapat harga setengah dari normal. Semoga Anomali Coffee tetap jaya dan banyak promo.”`,
  },
];
function useHomeProductRatings() {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  useEffect(() => {
    ensureCompanyBackendless();
    (TestimonyStore.find({ properties: ['productObjectId', 'rating'] }) as Promise<TestimonyRecord[]>)
      .then((list) => {
        const map: Record<string, number[]> = {};
        list.forEach((t) => {
          if (!map[t.productObjectId]) map[t.productObjectId] = [];
          map[t.productObjectId].push(t.rating);
        });
        const avg: Record<string, number> = {};
        Object.entries(map).forEach(([pid, vals]) => {
          avg[pid] = Math.round((vals.reduce((s, v) => s + v, 0) / vals.length) * 10) / 10;
        });
        setRatings(avg);
      })
      .catch(() => {});
  }, []);
  return ratings;
}

const heroSlides = [
  {
    img: hero1,
    title: "Handcrafted, Humble and Honest",
    subtitle: "Donuts that taste as real as the hands that made them.",
  },
  {
    img: hero2,
    title: "Fresh Every Day",
    subtitle: "Made with love, served with passion.",
  },
  {
    img: hero3,
    title: "Taste the Difference",
    subtitle: "Premium ingredients, crafted for you.",
  },
];

// Komponen bintang rating
function StarIcons({ count = 5 }: { count?: number }) {
  return (
    <div className="flex mb-2">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <polygon points="10,1.5 12.59,7.12 18.68,7.63 14.05,11.97 15.18,18.02 10,14.88 4.82,18.02 5.95,11.97 1.32,7.63 7.41,7.12" />
        </svg>
      ))}
    </div>
  );
}

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { products, loading: productsLoading } = useProductsBackendless();
  const ratings = useHomeProductRatings();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 35000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

  return (
  <div>
    <Navbar />

    {/* Hero Section — Image Carousel */}
    <section className="relative w-full overflow-hidden" style={{ height: '560px' }}>
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: currentSlide === idx ? 1 : 0, zIndex: currentSlide === idx ? 10 : 0 }}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.38)' }} />
          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white max-w-xl leading-tight mb-4 drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-md drop-shadow">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Prev Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full text-white text-2xl font-bold transition"
        style={{ background: 'rgba(255,255,255,0.25)' }}
        aria-label="Previous slide"
      >
        &#8249;
      </button>

      {/* Next Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full text-white text-2xl font-bold transition"
        style={{ background: 'rgba(255,255,255,0.25)' }}
        aria-label="Next slide"
      >
        &#8250;
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              background: currentSlide === idx ? '#fff' : 'rgba(255,255,255,0.4)',
              transform: currentSlide === idx ? 'scale(1.3)' : 'scale(1)',
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>

    <section className="flex flex-col md:flex-row items-start md:items-center justify-center md:justify-start gap-8 px-4 py-12 md:py-16 bg-white">
    {/* Left: Image */}
    <div className="w-full md:w-2/5 flex-shrink-0 flex justify-center">
      <img
        src={kopi1}
        alt="Coffee Roasting"
        className="rounded-lg shadow-lg w-full max-w-[350px] object-cover"
      />
    </div>
    {/* Right: Content */}
    <div className="w-full md:w-3/5 flex flex-col items-start">
      {/* Title */}
      <h1 className="text-3xl  md:text-4xl font-bold text-[#7e2727] mb-3 self-center">Our Company</h1>
      
      <div className="w-32 h-1 bg-red-800 rounded-full self-center mb-7"></div>
      
      {/* Company Description */}
      <p className="text-center mt-5 md:text-left text-black font-semibold mb-7">
        Establish in 2007, Anomali Coffee is a coffee roaster company providing coffee with specialty <br />
        standart from all over indonesia
      </p>
      {/* Mission */}
      <div className="flex items-center mb-6 mt-5">
        <span className="bg-[#7e2727] text-white font-bold px-5 py-2 rounded mr-5 text-lg">Mission</span>
        <span className="text-black font-bold">Promoting and curating Indonesia Specialty Coffee<br /> through education and experience</span>
      </div>
      {/* Vision */}
      <div className="flex items-center mt-5">
        <span className="bg-[#7e2727] text-white font-bold px-5 py-2 rounded mr-5 text-lg">Vision</span>
        <span className="text-black font-bold">The most recognized crafted Indonesia Coffee</span>
      </div>
    </div>
  </section>
    <section className="bg-[#77100f] py-20 px-4">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-white text-4xl font-bold text-center mb-4">Our Products</h2>
      <div className="flex justify-center mb-8">
        <div className="w-32 h-1 bg-white rounded-full"></div>
      </div>
      {/* Product Cards */}
      {productsLoading ? (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 p-8 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.slice(0, 3).map((prod) => (
            <Link
              key={prod.objectId}
              to={`/products/${prod.objectId}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={prod.imageurl}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-sm font-bold text-[#2d1a1a] line-clamp-2 leading-snug mb-2 group-hover:text-[#77100f] transition-colors">
                  {prod.name}
                </h3>
                <p className="text-[#77100f] font-bold text-sm mb-1">
                  Rp{prod.price.toLocaleString('id-ID')}
                </p>
                <div className="flex items-center gap-1 text-xs">
                  {prod.objectId && ratings[prod.objectId] !== undefined ? (
                    <>
                      <span className="text-yellow-400 text-base">★</span>
                      <span className="font-semibold text-gray-700">{ratings[prod.objectId].toFixed(1)}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">Belum ada ulasan</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {/* More Products */}
      <div className="flex justify-end mt-8">
        <Link
          to="/products"
          className="text-white text-xl font-bold hover:text-yellow-300 transition"
        >
          More Products {'>>'}
        </Link>
      </div>
    </div>
  </section>
  <section className="bg-[#FFF9F2] py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-[#7b1815] mb-1 mt-4">
          Our Testimony
        </h2>
        <div className="w-32 h-1 bg-[#7b1815] mx-auto mb-4 rounded"></div>
        <p className="text-center text-gray-500 mb-8">
          what our costumers say about our products
        </p>

        <div className="flex flex-col md:flex-row gap-5 justify-center">
          {testimonies.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl shadow-md px-6 py-6 flex-1 min-w-[260px] max-w-sm flex flex-col"
            >
              <StarIcons />

              <p className="text-gray-600 italic text-[15px] mb-6">{t.message}</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-12 h-12 rounded-full bg-[#7b1815] flex items-center justify-center text-white text-xl font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-[#7b1815] leading-tight">{t.name}</div>
                  <div className="text-gray-600 text-sm">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    
        

    {/* Footer */}
    <Footer />
  </div>
  );
};

export default Home;