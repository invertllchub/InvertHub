"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
// Components
const Logo = dynamic(() => import("./Logo"), {
  ssr: false,
  loading: () => <p>Loading...</p>, 
});
const SideBarNav = dynamic(() => import("./SideBarNav"), {
  ssr: false,
  loading: () => <p>Loading...</p>, 
});
const SearchIcon = dynamic(() => import("./Search-Icon"), {
  ssr: false,
  loading: () => <p>Loading...</p>, 
});


function NavBar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  const links = [
    { href: "/projects", label: "PROJECTS" },
    { href: "/services", label: "SERVICES" },
    { href: "/careers", label: "CAREERS" },
  ]
  
  useEffect(() => {
    const darkSections = document.querySelectorAll(".dark-section");
    let ticking = false;

    const observer = new IntersectionObserver((entries) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isInDark = entries.some(entry => entry.isIntersecting);
          setIsDark(prev => {
            if (prev === isInDark) return prev; 
            return isInDark;  
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { threshold: 0.2 });

    darkSections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);


  return (
    <>
      <nav className="fixed w-full flex items-center justify-between px-4 py-2 top-0 left-0 z-40 bg-transparent">
        {/* Logo */}
        <Logo isDark={isDark}/>

        {/* NavLinks */}
        <div className="flex items-center justify-center gap-10">
          <ul className="hidden md:flex justify-center items-center gap-6">
            {links.map(link => (
              <li key={link.href} className="bg-black py-0.5 px-2 rounded-4xl">
                <Link
                  href={link.href}
                  className={`font-semibold transition-colors duration-300 ${
                    pathname === link.href
                      ? "text-yellow-400"
                      : "text-white hover:text-yellow-300"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
              ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <SearchIcon isDark={isDark}/>
            <SideBarNav isDark={isDark}/>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
