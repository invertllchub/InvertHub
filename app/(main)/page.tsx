"use client";

import dynamic from "next/dynamic";
// components
const Section1 = dynamic(() => import('@/components/main/homePage/Section1'));
const Section2 = dynamic(() => import('@/components/main/homePage/Section2'));
const Section3 = dynamic(() => import('@/components/main/homePage/Section3'));
const Section4 = dynamic(() => import("@/components/main/homePage/Section4"), {
  ssr: false, 
  loading: () => (
    <div className="flex items-center justify-center h-screen text-white">
      Loading projects...
    </div>
  ),
});
const Section5 = dynamic(() => import('@/components/main/homePage/Section5'));
const Section6 = dynamic(() => import('@/components/main/homePage/Section6'));
const Section7 = dynamic(() => import('@/components/main/homePage/Section7'));
const Section8 = dynamic(() => import('@/components/main/homePage/Section8'));


export default function HomePage() {

  return (
    <main className="bg-black text-[#292929]">
      {/* Section 1 - video */}
      <Section1 />

      <div className="bg-linear-to-b from-[#f6f6f6] via-sky-100 to-sky-200">
        {/* Section 2 - ABOUT US */}
        <Section2 />

        {/* Section 3 - FEATURED PROJECTS */}
        <Section3 />

        {/* Section 4 - Vertical Scroll */}
        <Section4/>
      </div>

      {/* Section 5 - Architecture */}
      <Section5 />

      {/* Section 6 - Research */}
      <Section6 />

      {/* Section 7 - Join the Team */}
      <Section7 />
  
      {/* Section 8 - YellowCard & Contact */}
      <Section8 />

    </main>
  );
}
