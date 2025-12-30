"use client";

import '../../app/(main)/globals.css'
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Icons
import { Newspaper, Building2, Briefcase, Users, Menu, X, CircleHelp, LayoutDashboard, Settings  } from 'lucide-react';
import Image from 'next/image';
import LogoutButton from './Buttons/LogoutButton';


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
        ${isOpen ? "translate-x-0" : "-translate-x-full"}  flex flex-col gap-4 md:gap-8
        md:translate-x-0 md:w-54`}
    >
      <div className="flex justify-center items-center pt-16 md:pt-6">
        <Link href="/" aria-label="Home">
          <div className="relative w-[170px] h-[60px] z-10">
            <Image
            src="https://res.cloudinary.com/dyfregti9/image/upload/v1761486697/Invert-logo-white_h4kw7f.png" 
            alt="Invert-Hub Logo"
            priority
            fill
            sizes="(max-width: 768px) 120px, 200px" 
            className="object-contain origin-left cursor-pointer"
            />
          </div>
        </Link>
      </div>

      <ul className="w-full flex flex-col gap-3 px-2">
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

      <ul className="w-full flex flex-col px-2 mb-5 mt-auto">

        <div className="pt-10 border-t border-gray-400 mx-4"></div>

        <li className="w-full">
          <Link 
            href="/dashboard/help"
            className="flex items-center gap-3 font-semibold p-3.5 rounded-md 
            transition-colors duration-300 hover:bg-white hover:text-(--primary) text-white"
          >
            <CircleHelp size={20}/>
            <span>Help</span>
          </Link>
        </li>

        {/* Settings */}
        <li className="w-full">
          <Link 
            href="/dashboard/settings"
            className="flex items-center gap-3 font-semibold p-3.5 rounded-md 
            transition-colors duration-300 hover:bg-white hover:text-(--primary) text-white"
          >
            <Settings size={20}/>
            <span>Settings</span>
          </Link>
        </li>

        {/* Logout */}
        <li className="w-full">
          <LogoutButton />
        </li>
      </ul>

    </nav>
    </>
  );
}

export default NavBar;

