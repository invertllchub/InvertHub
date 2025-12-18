import React from "react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
// React Query
import useGetProjectsWithPagination from "@/hooks/projects/useGetProjectsWithPagination";
// Animation
import { useHomeAnimations } from "@/hooks/useHomeAnimations ";

function Section4() {
  const defaultImage = "https://res.cloudinary.com/dyfregti9/image/upload/v1761832027/INVERT-HUB/zvakmojuzfa5t9ty85r9.jpg"
  const verticalRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useGetProjectsWithPagination(1, 4, "");
  const projects = data?.data?.data || [];

  useHomeAnimations(verticalRef, [projects]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold animate-pulse">
          Loading projects...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl text-red-500 font-semibold">
          Failed to load projects 
        </p>
      </div>
    );
  }

  return (
    <section
      ref={verticalRef}
      className="section4 vertical-section relative overflow-hidden h-screen z-10"
    >
      <div className="wrapper h-full relative flex flex-col gap-[20vh] items-center p-1">
        {projects.map((item, index, arr) => (
          <div
            key={item.id}
            className="item bg-white absolute w-full h-full flex flex-col sm:flex-row shadow-lg overflow-hidden p-5"
          >
            <div className="relative w-full sm:w-1/2 h-[60vh] md:h-full">
              <Image
                src={item.imageUrl || defaultImage}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
                unoptimized
              />
            </div>
            <div
              className="item_content relative flex flex-col justify-center text-center 
                md:text-start bg-white text-[#292929] p-6 sm:p-12 sm:w-1/2 w-full h-[40vh] sm:h-full"
            >
              <h2 className="text-sm md:text-lg font-bold mb-2">
                {item.name}
              </h2>
              <p className="text-xl md:text-4xl font-bold">
                {item.description}
              </p>
              <div className="w-full h-10 flex items-center justify-between absolute bottom-0 left-0 p-6">
                <p>{`${String(index + 1).padStart(2, "0")} / ${String(
                  arr.length
                ).padStart(2, "0")}`}</p>
                <Link href="/projects" className="relative text-xl group">
                  ALL PROJECTS
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-black scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(Section4);
