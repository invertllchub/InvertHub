"use client";
import { useState } from "react";
import Link from "next/link";

interface NavLink {
    href: string;
    label: string;
}

function Footer() {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const links: NavLink[] = [
        { href: "/projects", label: "PROJECTS" },
        { href: "/services", label: "SERVICES" },
        { href: "/careers", label: "CAREERS" },
        { href: "/about", label: "ABOUT US" },
        { href: "/research", label: "RESEARCH & INNOVATION" },
        { href: "/news", label: "NEWS & INSIGHTS" },
        { href: "/contact", label: "CONTACT US" },
    ];

    return (
        <footer className="w-full bg-black text-white p-10">

            <div className="flex flex-col md:flex-row justify-between gap-10">
               {/* Navigation Links */}
                <nav className="w-full md:w-8/12" aria-label="Footer Navigation">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        {links.map((link) => (
                            <li
                            key={link.href}
                            onMouseEnter={() => setHoveredLink(link.href)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className={`transition-opacity duration-300 ${
                                hoveredLink
                                    ? hoveredLink === link.href
                                        ? "opacity-100"
                                        : "opacity-40"
                                    : "opacity-100"
                                }`}
                            >
                                <Link
                                href={link.href}
                                className="font-semibold text-lg sm:text-xl transition focus:underline"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="w-full md:w-4/12 flex flex-col gap-3 text-gray-400 text-sm">
                    <p>© 2025 Invert Hub. All rights reserved.</p>
        
                    <div className="flex flex-wrap gap-4">
                        <Link
                        href="/terms"
                        className="hover:text-white transition-colors"
                        >
                            Terms & Conditions
                        </Link>
                        <Link
                        href="/privacy"
                        className="hover:text-white transition-colors"
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
