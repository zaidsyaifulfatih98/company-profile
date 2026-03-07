import { useEffect, useRef, useCallback } from "react";

// SVG d-attribute for hamburger and close icons
const ICON_BARS = "M4 6h16M4 12h16M4 18h16";
const ICON_TIMES = "M6 18L18 6M6 6l12 12";

export function useMobileMenu(navLinksId: string, menuToggleClass: string) {
  const navLinksRef = useRef<HTMLDivElement | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);

  // Toggle Menu Handler
  const toggleMenu = useCallback(() => {
    if (!navLinksRef.current || !menuToggleRef.current) return;
    navLinksRef.current.classList.toggle("active");
    const path = menuToggleRef.current.querySelector("path");
    if (navLinksRef.current.classList.contains("active")) {
      path?.setAttribute("d", ICON_TIMES);
    } else {
      path?.setAttribute("d", ICON_BARS);
    }
  }, []);

  // Click anchor smooth scroll handler
  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
      if (targetId) {
        const target = document.querySelector(targetId);
        if (target) {
          navLinksRef.current?.classList.remove("active");
          const path = menuToggleRef.current?.querySelector("path");
          path?.setAttribute("d", ICON_BARS);
          // Scroll offset for sticky navbar
          const navHeight = (document.querySelector(".navbar") as HTMLElement)?.offsetHeight ?? 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }
    };
    anchors.forEach(anchor =>
      anchor.addEventListener("click", handleAnchorClick)
    );
    return () => {
      anchors.forEach(anchor =>
        anchor.removeEventListener("click", handleAnchorClick)
      );
    };
  }, []);

  // Navbar scroll background effect
  useEffect(() => {
    const scrollHandler = () => {
      const navbar = document.querySelector(".navbar") as HTMLElement;
      if (!navbar) return;
      if (window.scrollY > 50) {
        navbar.style.background = "#77100f";
        navbar.style.boxShadow = "0 2px 20px rgba(80,45,10,0.12)";
      } else {
        navbar.style.background = "#77100f";
        navbar.style.boxShadow = "none";
      }
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Click outside for closing menu
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (
        navLinksRef.current &&
        menuToggleRef.current &&
        !navLinksRef.current.contains(e.target as Node) &&
        !menuToggleRef.current.contains(e.target as Node)
      ) {
        navLinksRef.current.classList.remove("active");
        const icon = menuToggleRef.current.querySelector("i");
        icon?.classList.remove("fa-times");
        icon?.classList.add("fa-bars");
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  return { navLinksRef, menuToggleRef, toggleMenu };
}