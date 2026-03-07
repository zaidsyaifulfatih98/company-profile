import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useMobileMenu } from "../hooks/useMobileMenu";
import Logo from"../assets/logo.jpg"
import { useAuthStore } from "../store/useAuthStore";
import useTotalCartStore from "../store/useTotalCartStore";


const linkClass = (active: boolean) =>
  `font-medium py-2 transition-colors duration-300 ${
    active ? 'text-[#eac784]' : 'text-white hover:text-[#eac784]'
  }`;

const Navbar: React.FC = () => {
  const { navLinksRef, menuToggleRef, toggleMenu } = useMobileMenu("navLinks", "menu-toggle");
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuthStore();
  const { totalCart } = useTotalCartStore();

  return (
    <nav className="flex items-center justify-between px-4 md:px-10 py-[18px] bg-[#77100f] shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2.5 text-[1.4rem] font-bold text-white">
        <img src={Logo} alt="Anomali Coffe" className="bg-white h-10 w-auto" />
        <span>Anomali Caffee</span>
      </div>

      {/* Nav links */}
      <div
        className="nav-links hidden md:flex gap-8 items-center"
        ref={navLinksRef}
        id="navLinks"
      >
        <Link to="/company-page" className={linkClass(location.pathname === "/company-page")}>Home</Link>
        <Link to="/company-page/about-us" className={linkClass(location.pathname === "/company-page/about-us")}>About Us</Link>
        <Link to="/company-page/products" className={linkClass(location.pathname === "/company-page/products")}>Products</Link>
        <Link to="/company-page/teams" className={linkClass(location.pathname === "/company-page/teams")}>Teams</Link>
        <Link to="/company-page/blog" className={linkClass(location.pathname === "/company-page/blog")}>Blog</Link>
        {!isAuthenticated ? (
          <Link to="/company-page/login" className={linkClass(location.pathname === "/company-page/login")}>Login</Link>
        ) : (
          <>
            <Link to="/company-page/create-blog" className={linkClass(location.pathname === "/company-page/create-blog")}>Create Blog</Link>
            <div className="flex items-center gap-3">
              <span className="text-[#fff8e1] font-medium">{user?.name || user?.email}</span>
              <button type="button" className="text-white font-medium hover:text-[#eac784] transition-colors duration-300" onClick={logout}>Logout</button>
            </div>
          </>
        )}

        {/* Cart icon */}
        <Link to="/company-page/cart" className="relative hidden md:flex items-center text-white hover:text-[#eac784] transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          {totalCart > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-[#77100f] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalCart > 99 ? '99+' : totalCart}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile right: Cart + Hamburger */}
      <div className="flex md:hidden items-center gap-3">
        <Link to="/company-page/cart" className="relative flex items-center text-white hover:text-[#eac784] transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          {totalCart > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-[#77100f] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalCart > 99 ? '99+' : totalCart}
            </span>
          )}
        </Link>
        <button
          type="button"
          className="text-white cursor-pointer select-none p-1"
          ref={menuToggleRef}
          aria-label="Menu"
          onClick={toggleMenu}
          onKeyDown={e => { if (e.key === "Enter") toggleMenu(); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};
export default Navbar;