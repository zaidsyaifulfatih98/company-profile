import React from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import logo from "../assets/logo.jpg"
import kopi1 from "../assets/kopi1.jpg"
import produk1 from "../assets/produk1.jpg"
import produk2 from "../assets/produk2.jpg"
import produk3 from "../assets/produk3.jpg"


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

const Home: React.FC = () => (
  <div>
    <Navbar />
    {/* Hero Section */}
<section className="hero min-h-screen flex items-center justify-center bg-gradient-to-br from-[#b68b43] via-[#b68b43] to-[#fff8ec]">
    
  <div className="hero-content flex flex-col items-center text-center w-full max-w-3xl px-4 py-12">
        <img
        src={logo}
        alt="Logo CoffeJiwo"
        className="w-40 h-40 mb-6 rounded-lg bg-white shadow-lg object-contain"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-800 mb-4">Anomali Coffee</h1>
        <p className="tagline text-xl font-bold text-yellow-900 mb-2">
        Kopi Asli Indonesia
        </p>
        <p className="description text-base md:text-lg text-brown-800 opacity-90 mb-8  font-bold">
        Nikmati pengalaman kopi terbaik bersama Anomali Coffee. Kami hadir untuk pecinta kopi Indonesia dengan cita rasa khas dan pelayanan profesional
        </p>
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
        <a
            href="https://wa.me/6281234567890?text=Halo%20Anomali%20Coffee,%20saya%20ingin%20reservasi"
            className="btn-primary flex items-center gap-2 px-15 py-3 bg-red-800 text-white font-semibold rounded-full shadow transition hover:bg-yellow-600"
            target="_blank"
            rel="noopener noreferrer"
        >
            <i className="fab fa-whatsapp"></i> Hubungi Kami
        </a>
        
        </div>
    </div>
    <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <i className="fas fa-chevron-down text-yellow-600 text-2xl animate-bounce"></i>
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
      <h1 className="text-3xl mb-5 md:text-4xl font-bold text-[#7e2727] mb-8 self-start">Our Company</h1>
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

export default Home;