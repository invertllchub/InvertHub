"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const texts = [
    "DESIGN TO",
    "TRANSFORM",
    "DESIGN.",
    "MEDIA.",
    "BUSINESS."
];

const ScreenText = () => {
    const currentRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    let index = 0; 

    useEffect(() => {
        const interval = setInterval(() => {
        if (!currentRef.current || !nextRef.current) return;

        const nextIndex = (index + 1) % texts.length;

        gsap.set(nextRef.current, { y: "100%" });
        nextRef.current.innerText = texts[nextIndex];

        const tl = gsap.timeline({
            onComplete: () => {
                if (currentRef.current) {
                    currentRef.current.innerText = texts[nextIndex];
                    gsap.set(currentRef.current, { y: 0 });
                }
                index = nextIndex;
            },
        });

        tl.to(currentRef.current, { y: "-100%", duration: 0.8, ease: "power2.inOut" })
        .to(nextRef.current, { y: 0, duration: 0.8, ease: "power2.inOut" }, "<");

    }, 3500);

    return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div className="relative top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white 
        font-bold h-[40px] md:h-[60px] lg:h-[180px] flex justify-center items-center overflow-hidden">
            <div ref={currentRef} className="absolute font-bold text-4xl md:text-6xl xl:text-[150px] leading-none">{texts[0]}</div>
            <div ref={nextRef} className="absolute font-bold text-4xl md:text-6xl xl:text-[150px] leading-none"></div>
        </div>

        <div className="absolute  top-[60%] left-1/2 transform -translate-x-1/2 text-white 
            flex justify-between gap-10">
            <Link href="/projects" className="relative text-xl group">
                PROJECTS
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
            </Link>
            <Link href="/services" className="relative text-xl group">
                SERVICES
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
            </Link>
        </div>
        </>
    );
};

export default ScreenText;
