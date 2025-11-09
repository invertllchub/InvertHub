"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";


function Logo({ isDark }: { isDark: boolean }) {
    return (
        <div className="transition-all duration-300">
            <Link href="/" aria-label="Home">
                <div className="relative w-[170px] h-[60px]  z-10">
                    <Image
                        src={
                            isDark 
                            ? "https://res.cloudinary.com/dyfregti9/image/upload/v1761486697/Invert-logo-white_h4kw7f.png" 
                            : "https://res.cloudinary.com/dyfregti9/image/upload/v1761486697/Invert-logo-black_wohvde.png"
                        }
                        alt="Invert-Hub Logo"
                        priority
                        fill
                        sizes="(max-width: 768px) 120px, 200px" 
                        className="object-contain origin-left cursor-pointer transition-transform duration-800 hover:transform-[scale(1.3)]"
                    />
                </div>
            </Link>
        </div>
    );
}

export default React.memo(Logo);
