import React from "react";

const socialLinkClass = "flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(234,199,132,0.16)] text-[#ffeac4] text-[1.1rem] transition-colors duration-300 hover:bg-[#eac784] hover:text-[#2d1c09]";
const footerLinkClass = "text-white text-[0.98rem] leading-relaxed transition-colors duration-200 hover:text-[#eac784]";

const Footer: React.FC = () => (
  <footer className="bg-[#77100f] text-white mt-20 px-6 pt-14 pb-6">
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 mb-8">

      {/* Brand */}
      <div>
        <h4 className="text-white text-[1.2rem] font-semibold mb-4">Anomali Coffee</h4>
        <p className="text-white text-[0.98rem] leading-relaxed">
          Tempat nongkrong dan produk kopi kekinian dengan suasana nyaman dan biji kopi pilihan. Selalu menyuguhkan kualitas, rasa, dan pelayanan ramah untuk semua pecinta kopi.
        </p>
        <div className="flex gap-4 mt-3">
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={socialLinkClass}><i className="fab fa-whatsapp"></i></a>
          <a href="https://instagram.com/coffejiwo" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialLinkClass}><i className="fab fa-instagram"></i></a>
          <a href="mailto:info@coffejiwo.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className={socialLinkClass}><i className="fas fa-envelope"></i></a>
        </div>
      </div>

      {/* Menu */}
      <div>
        <h4 className="text-white text-[1.2rem] font-semibold mb-4">Menu</h4>
        <ul className="flex flex-col gap-2 list-none p-0 m-0">
          <li><a href="/company-page/products" className={footerLinkClass}>Kopi Espreso</a></li>
          <li><a href="/company-page/products" className={footerLinkClass}>Manual Brew</a></li>
          <li><a href="/company-page/products" className={footerLinkClass}>Snack &amp; Meals</a></li>
          <li><a href="/company-page/products" className={footerLinkClass}>Barista Service</a></li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h4 className="text-white text-[1.2rem] font-semibold mb-4">Company</h4>
        <ul className="flex flex-col gap-2 list-none p-0 m-0">
          <li><a href="/company-page/about-us" className={footerLinkClass}>Tentang Kami</a></li>
          <li><a href="/company-page/teams" className={footerLinkClass}>Tim</a></li>
          <li><a href="/company-page/blog" className={footerLinkClass}>Artikel</a></li>
          
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-white text-[1.2rem] font-semibold mb-4">Kontak</h4>
        <ul className="flex flex-col gap-2 list-none p-0 m-0 text-white text-[0.98rem] leading-relaxed">
          <li><i className="fas fa-phone"></i> &nbsp; 0812-3456-7890</li>
          <li><i className="fas fa-map-marker-alt"></i> &nbsp; Jl. Kopi No. 19, Malang, Indonesia</li>
          <li><i className="fas fa-clock"></i> &nbsp; 08.00 - 22.00 WIB</li>
        </ul>
      </div>
    </div>

    <div className="pt-4 text-center text-[0.92rem] border-t border-[rgba(234,199,132,0.14)]">
      <p>&copy; {new Date().getFullYear()} Anomali Coffee. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;