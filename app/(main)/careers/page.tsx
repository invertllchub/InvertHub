"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
// Components
const ImageBlock = dynamic(() => import('@/components/main/ImageBlock'), {
    loading: () => (
        <div className="flex items-center justify-center h-screen text-white">
            Loading projects...
        </div>
    )
})

const Team = [
  {
    name: "Jasmine",
    role: "Creative manger",
    comment:
      "“At Invert Hub I never felt like just an employee, I felt like part of something bigger. The mentorship and guidance I received didn’t just help me improve my technical skills, it gave me the confidence to explore new ideas and take ownership of my work. Every challenge became an opportunity to grow, and every success was celebrated as a team.”",
  },
  {
    name: "Haidy",
    role: "Project manager",
    comment:
      "“What I love most about working at Invert Hub is the freedom to bring my own ideas to the table. It’s not a place where you just follow a process, it’s a place where you help shape it. My suggestions are valued, my creativity is encouraged, and I know that my contributions make a real difference. That sense of trust keeps me motivated every day.”",
  },
  {
    name: "Doaa",
    role: "Channel Sales Manager",
    comment:
      "“The international exposure I’ve had here opened doors for me I didn’t even know existed. From working with clients across different cultures to collaborating with experts in various fields, every project has been a chance to expand my knowledge and broaden my perspective. I feel like I’m part of a global community that constantly pushes me to evolve.”",
  },
];
function Page() {
  return (
    <div className="w-full py-30">
      <section className="w-full px-4 md:px-16">
        <h1 className="w-full text-4xl md:text-8xl font-extrabold">CAREERS</h1>
        <p className="text-2xl md:text-4xl font-semibold mt-6">
          Join us on a journey into the unexpected, where bold thinking meets
          collective intelligence, and the bigger picture is always within
          reach.
        </p>
        <div className="w-full mt-12 flex justify-end">
          <Link
            href="/jobs"
            target="_blanck"
            className="relative text-xl group left-0"
          >
            VIEW APPLICATIONS
            <span
              className="absolute left-0 -bottom-1 w-full h-0.5 bg-black scale-x-100 
                        origin-left transition-transform duration-300 group-hover:scale-x-0"
            ></span>
          </Link>
        </div>
      </section>
      <section className="w-full h-full mt-12 px-4 md:px-16">
        <ImageBlock 
        alt="Careers picture"
        src="https://res.cloudinary.com/dyfregti9/image/upload/v1759329723/Carrier-02_nobuix.png"
        />
      </section>

      {/* Articles-2 section */}
      <section className="px-4 md:px-16 my-40">
        <div className="mt-32 mb-24">
          <h1 className="text-2xl md:text-4xl font-bold ">
            Growing Together, Building the Future
          </h1>
          <div className="w-full mt-6">
            <h3 className="text-md md:text-xl font-semibold">
              come from tools or systems alone, but from individuals who feel
              supported, inspired, and empowered to push boundaries. That’s why
              we’ve built a culture where growth is not an option, it’s a given.
              From mentorship and skill development programs to
              cross-disciplinary collaborations, we create pathways for every
              team member to expand their knowledge and impact. You’ll work on
              international projects that stretch your creativity and sharpen
              your problem-solving skills, while being surrounded by colleagues
              who share the same passion for excellence and progress. We believe
              in open dialogue, shared learning, and giving you the freedom to
              shape ideas into reality. Flexibility, trust, and support are at
              the heart of how we operate, ensuring you can balance ambition
              with well-being. At Invert Hub, success is measured not only by
              the projects we deliver, but by the people we help grow into
              leaders, innovators, and changemakers. Here, you’ll find more than
              a workplace, you’ll find a hub where your voice matters, your
              ideas count, and your future is built together with us.
            </h3>
          </div>
        </div>
      </section>

      <section className="w-full h-full mt-8 px-4 md:px-16">
        <ImageBlock 
        alt="Careers picture"
        src="https://res.cloudinary.com/dyfregti9/image/upload/v1759593333/Carrier-01_iyur94_pxzisq.webp"
        />
      </section>

      <section className="w-full h-full mt-20 px-4 md:px-16">
        <h1 className="text-2xl md:text-4xl font-bold my-10">From The Team</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12">
          {Team.map((mem, index) => {
            return (
              <div
                key={index}
                className={`p-8 min-h-[300px] rounded-md flex flex-col justify-between
                  ${index % 2 === 0
                    ? "bg-linear-to-b from-yellow-100 via-yellow-200/40 to-yellow-300/70"
                    : "bg-linear-to-b from-sky-100 via-sky-200/40 to-sky-300/70"
                  }`}
              >
                <p>{mem.comment}</p>
                <div>
                  <h3 className="font-bold">{mem.name}</h3>
                  <h4 className="text-gray-500">{mem.role}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Page;
