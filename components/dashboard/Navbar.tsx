"use client";

import Link from "next/link";
import '../../app/(main)/globals.css'
import { Newspaper, Building2, CircleUser , Briefcase, Users, Menu, X, House } from 'lucide-react';
import LogoutButton from "./LogoutButton";
import { useState } from "react";
import Logo from "../main/Logo";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: "/dashboard", label: "Home", icon: <House  size={20} /> },
    { href: "/dashboard/profile", label: "Profile", icon: <CircleUser  size={20} /> },
    { href: "/dashboard/projects", label: "Projects", icon: <Building2 size={20} /> },
    { href: "/dashboard/articles", label: "Articles", icon: <Newspaper size={20} /> },
    { href: "/dashboard/jobs", label: "Jobs", icon: <Briefcase size={20} /> },
    { href: "/dashboard/users", label: "Users", icon: <Users size={20} /> },
  ];

  return (
    <>
    
    <div className="fixed top-4 left-4 md:hidden z-50">
      <button
      onClick={() => setIsOpen(!isOpen)}
      className={` text-white p-3 rounded-full  focus:outline-none transition-all duration-300
        ${isOpen ? "bg-transparent" : "bg-[#473472] shadow-lg"}
        `}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>

    <nav 
    className={`fixed left-0 bottom-0 h-full w-6/12 bg-[#473472] z-40 transition-transform duration-300 overflow-hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:w-54`}
    >
      <ul className="w-full flex flex-col items-center gap-6 mt-20 px-2">
        {links.map((link) => (
          <li key={link.href} className="w-full">
            <Link
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex flex-row items-center h-10 gap-6 text-white font-semibold px-6 py-2"
            >
              <span>{link.icon}</span>
              <span className="whitespace-nowrap">
                {link.label}
              </span>
            </Link>
          </li>
        ))}
        <li 
        onClick={() => document.getElementById("logout-btn")?.click()}
        className="absolute bottom-10 w-full flex flex-row items-center h-10 gap-3 text-white font-semibold cursor-pointer px-6">
          <LogoutButton id="logout-btn"/> <span className="whitespace-nowrap">Log out</span>
        </li>
      </ul>
    </nav>
    </>
  );
}

export default NavBar;

