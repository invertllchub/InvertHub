"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useHomeAnimations = (verticalRef: React.RefObject<HTMLDivElement | null>, dependencies: any[] = []) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation 1: تصغير أول سيكشن
      gsap.fromTo(
        ".section1",
        { opacity: 1, scale: 1, transformOrigin: "bottom center" },
        {
          opacity: 0.7,
          scale: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section1",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Animation 2: section5
      gsap.fromTo(
        ".section5",
        { y: 0 },
        {
          y: -50,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section5",
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );

      // Animation 3: Vertical Scroll stacking
      const section = verticalRef.current;
      if (!section) return;

      const items = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(".item")
      );

      items.forEach((item, index) => {
        gsap.set(item, { scale: 0.9, y: 15 });
        if (index !== 0) gsap.set(item, { yPercent: 100 });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${items.length * 100}%`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power1.inOut" },
      });

      items.forEach((item, index) => {
        timeline.to(item, { scale: 0.7, borderRadius: "10px", opacity: 0 });
        if (items[index + 1]) {
          timeline.to(items[index + 1], { yPercent: 0 }, "<");
        }
      });
    });

    return () => ctx.revert();
  }, dependencies);
};
