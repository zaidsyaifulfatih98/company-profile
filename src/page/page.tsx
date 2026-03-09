import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import kopi1 from "../assets/kopi1.jpg"
import produk1 from "../assets/produk1.jpg"
import produk2 from "../assets/produk2.jpg"
import produk3 from "../assets/produk3.jpg"
import hero1 from "../assets/hero1.jpg"
import hero2 from "../assets/hero2.jpg"
import hero3 from "../assets/hero3.jpg"


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
const products = [
  {
    img: produk1,
    title: 'Anomali Coffee Biji Kopi Susu Blend',
    flavor: 'Dark Chocolate, Caramel, Fresh Butter',
  },
  {
    img: produk2,
    title: 'Anomali Coffee Papua Lembah Kamu',
    flavor: 'Dark Chocolate, Coconut, Mapple Syrup',
  },
  {
    img: produk3,
    title: 'Anomali Coffee Biji Kopi Bali Kintamani 1KG',
    flavor: 'Orange, Vanilla, Dark Chocolate',
  },
];

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map((prod, idx) => (
          <div key={idx} className="bg-[#eaeaea] rounded-2xl shadow-lg overflow-hidden flex flex-col items-center py-6 px-4">
            <img
              src={prod.img}
              alt={prod.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h3 className="text-black text-xl font-bold text-center mb-3">{prod.title}</h3>
            <span className="text-black text-lg font-semibold mb-2">Flavor :</span>
            <p className="text-black text-base text-center">{prod.flavor}</p>
          </div>
        ))}
      </div>
      {/* More Products */}
      <div className="flex justify-end mt-8">
        <a
          href="/products"
          className="text-white text-xl font-bold hover:text-yellow-300 transition"
        >
          More Products {'>>'}
        </a>
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