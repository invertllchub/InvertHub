"use client";

import '../../app/(main)/globals.css'
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Icons
import { Newspaper, Building2, Briefcase, Users, Menu, X, House, LayoutDashboard  } from 'lucide-react';




function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard  size={20} /> },
    { href: "/dashboard/projects", label: "Projects", icon: <Building2 size={20} /> },
    { href: "/dashboard/articles", label: "Articles", icon: <Newspaper size={20} /> },
    { href: "/dashboard/jobs", label: "Jobs", icon: <Briefcase size={20} /> },
    { href: "/dashboard/users", label: "Team", icon: <Users size={20} /> },
  ];

  return (
    <>
    
    <div className="fixed top-4 left-4 md:hidden z-50">
      <button
      onClick={() => setIsOpen(!isOpen)}
      className={` text-white p-3 rounded-full  focus:outline-none transition-all duration-300
        ${isOpen ? "bg-transparent" : "bg-(--primary) shadow-lg"}
        `}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>

    <nav 
    className={`fixed left-0 bottom-0 h-full w-6/12 bg-(--primary) z-40 transition-transform duration-300 overflow-hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}  flex flex-col justify-between
        md:translate-x-0 md:w-54`}
    >
      <ul className="w-full flex flex-col gap-3 px-2 mt-20">
        {links.map((link) => (
          <li key={link.href} className="w-full">
            <Link
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 font-semibold p-3.5  rounded-md
                transition-colors duration-300 hover:bg-white hover:text-(--primary)
                ${pathname === link.href ? "bg-white text-(--primary)" : "bg-transparent text-white"}`}
            >
              {link.icon}
              <span className="whitespace-nowrap">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="w-full flex flex-col gap-3 px-2 mb-10">
        <li className="w-full">
          <Link
            href="/"
            className="flex items-center gap-3 font-semibold p-3.5 rounded-md
            transition-colors duration-300 hover:bg-white hover:text-(--primary)
            bg-transparent text-white"
          >
            <House size={20} />
            <span className="whitespace-nowrap">Return Home</span>
          </Link>
        </li>
      </ul>
    </nav>
    </>
  );
}

export default NavBar;

