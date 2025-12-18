"use client";

import LoadingSpinner from "@/components/states/LoadingSpinner";
import dynamic from "next/dynamic";
import Link from "next/link";

const ImageBlock = dynamic(() => import('@/components/main/ImageBlock'), {
    loading: () => (
      <LoadingSpinner />
    )
})
export default function AboutPage() {
  return (
    <div
      className='w-full py-30 px-4 md:px-16'
    >
        {/* Company Section */}
        <section className='w-full'>
          <h1 className='w-full text-4xl md:text-8xl font-extrabold'>
            A Company Built to Scale Creativity
          </h1>
          <div className="text-lg md:text-2xl font-semibold text-gray-800 space-y-5 leading-relaxed [&>p]:font-bold [&>p]:tracking-tight mt-10">
            <p>
              <span className="font-semibold  text-black">INVERT LLC</span> is a
              global design and consulting company operating at the intersection
              of architecture, publishing, and systems innovation.
            </p>
            <p>
              We work with forward-thinking founders, studios, artists, and
              organizations to turn ideas into structured, scalable realities.
              From the foundations of physical space to the architecture of
              digital business models, we support those who create, and those
              who want to grow.
            </p>
            <p>
              We are based in Berlin and Dubai, with collaborators across
              Europe, the Middle East, and beyond.
            </p>
          </div>
        </section>

        <section className='w-full h-full mt-20 '>
          <ImageBlock 
          alt=""
          src="https://res.cloudinary.com/dyfregti9/image/upload/v1759763106/About_sec1_shphul.webp"
          />
        </section>

        <div className="w-full mt-12 flex justify-center md:justify-end">
            <Link href="/contact" className="relative text-2xl font-semibold group left-0">
                CONTACT WITH US
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-black scale-x-100 
                origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
            </Link>
        </div>

        {/* Team Section */}
        <section className="mt-20">
          <h1 className='w-full text-4xl md:text-7xl font-extrabold'>
            A Collective of Designers,
            <br />
            Strategists, and System Builders
          </h1>
          <div className="space-y-5 text-lg leading-relaxed text-gray-800 [&>p]:font-bold [&>p]:tracking-tight mt-10">
            <p className="team-paragraph [word-spacing:-0.5px]">
              Our team combines backgrounds in architecture, creative direction,
              business strategy, automation, publishing, and software
              development.
            </p>
            <p className="team-paragraph font-medium text-black border-l-2 border-black pl-4 py-1 my-6 [word-spacing:-0.5px]">
              We don't believe in departments, we believe in cross-functional
              thinking.
            </p>
            <p className="team-paragraph [word-spacing:-0.5px]">
              Each project is supported by a curated mix of talent across
              disciplines, handpicked to fit the vision.
            </p>
          </div>
          <p className="meet-team-link mt-8 text-lg font-light border-l-2 border-black pl-4 py-1 transition-all duration-300 cursor-pointer [word-spacing:-0.5px]">
            → Meet the people behind WOW WORLD, ArchYards, and From Zero to
            Hero.
          </p>
        </section>

        <section className='w-full h-full mt-20 '>
          <ImageBlock 
          alt=""
          src="https://res.cloudinary.com/dyfregti9/image/upload/v1759763092/About_sec2_fol6dh.webp"
          />
        </section>

        {/* Philosophy Section */}
        <section className="mt-20">
          <blockquote className="text-center mb-16">
            <p
              className="italic leading-tight max-w-2xl mx-auto"
              style={{
                fontSize: "clamp(1.5rem, 0.5rem + 4vw, 4rem)",
              }}
            >
              "Design isn't what we do, it's how we think."
            </p>
          </blockquote>
          <div className="space-y-5 text-lg leading-relaxed text-gray-800 max-w-3xl mx-auto [&>p]:font-bold [&>p]:tracking-tight">
            <p className="philosophy-paragraph [word-spacing:-0.5px]">
              At INVERT, we treat every problem as a system, every opportunity
              as a structure to be shaped.
            </p>
            <p className="philosophy-paragraph [word-spacing:-0.5px]">
              Whether it's visual, spatial, digital, or strategic, our work aims
              to elevate creativity through clarity.
            </p>
            <p className="philosophy-paragraph font-medium text-black py-4 border-t border-b border-gray-300 text-center [word-spacing:-0.5px]">
              We don't chase trends,
              <br />
              We build tools, platforms, and identities that stand the test of
              evolution.
            </p>
          </div>
        </section>
      </div>
  );
}
