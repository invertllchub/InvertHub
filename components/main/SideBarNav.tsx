"use client"
import React, { useCallback } from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'

function SideBarNav({ isDark }: { isDark: boolean }) {
    const [openSideBar, setOpenSideBar] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const handleMouseEnter = useCallback((href: string) => setHoveredLink(href), []);
    const handleMouseLeave = useCallback(() => setHoveredLink(null), []);

    const links = [
        { href: '/projects', label: 'PROJECTS' },
        { href: '/services', label: 'SERVICES' },
        { href: '/careers', label: 'CAREERS' },
        { href: '/about', label: 'ABOUT US'},
        { href: '/research', label: 'RESEARCH & INNOVATION'},
        { href: '/news', label: 'NEWS & INSIGHTS'},
        { href: '/contact', label: 'CONTACT US'},
    ]

    return (
        <div >
            <div onClick={() => setOpenSideBar(true)} className='p-1 rounded-full cursor-pointer hover:bg-black/30'>
                <Menu 
                aria-hidden="true" 
                className={`
                ${isDark ? 'text-white' : 'text-black'}
                hover:scale-75 transition duration-500
                `}  
                size={35}/>
            </div>

            {/* Overlay */}
            {openSideBar && (
                <div 
                    onClick={() => setOpenSideBar(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-500"
                />
            )}

            {/* sideNav */}
            <div className={`fixed top-0 right-0 h-full w-6/12 md:w-4/12 z-50 bg-black text-white transition-transform ease-in-out duration-500
            ${openSideBar ? "translate-x-0" : "translate-x-full"}`}>

                <div className='w-full flex items-center justify-end p-6' >
                    <X aria-hidden="true" onClick={() => setOpenSideBar(false)} className='cursor-pointer' size={35}/>
                </div>

                <nav >
                    {/* NavLinks */}
                    <ul className='w-full mt-5 p-6 flex flex-col justify-start items-start gap-6'>
                        {links.slice(0, 3).map(link => (
                            <li key={link.href} 
                            onMouseEnter={() => handleMouseEnter(link.href)}
                            onMouseLeave={handleMouseLeave}
                            className={`bg-black py-1 px-2 rounded-4xl w-full cursor-pointer 
                                transition-opacity duration-400 
                                ${
                                    hoveredLink
                                    ? hoveredLink === link.href
                                        ? 'opacity-100'
                                        : 'opacity-40'
                                    : 'opacity-100'
                                }
                                `}
                            >
                                <Link 
                                    href={link.href}
                                    onClick={() => setOpenSideBar(false)}
                                    className={`font-semibold text-2xl lg:text-4xl`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* NavLinks */}
                    <ul className='p-6 flex flex-col justify-start items-start gap-2'>
                        {links.slice(3).map(link => (
                            <li key={link.href} 
                            onMouseEnter={() => setHoveredLink(link.href)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className={`w-full cursor-pointer transition-opacity duration-400
                                ${
                                    hoveredLink
                                    ? hoveredLink === link.href
                                        ? 'opacity-100'
                                        : 'opacity-40'
                                    : 'opacity-100'
                                }
                                `}
                            >
                                <Link 
                                    href={link.href}
                                    onClick={() => setOpenSideBar(false)}
                                    className={`font-semibold text-md transition`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default React.memo(SideBarNav);