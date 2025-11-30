"use client";

import dynamic from "next/dynamic";
// types
import { Project } from "../../../types/project";
//components
const ProjectCard = dynamic(
  () => import("@/components/main/projectPage/ProjectCard"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

// React Query Hook
import useGetProjects from "@/hooks/projects/useGetProjects";

function Page() {
  const {data} = useGetProjects();
  const projects = data?.data?.data || [];

  console.log(projects)

  return (
    <div className="w-full min-h-screen py-12 mt-20">
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="w-full text-4xl md:text-9xl font-extrabold">
            Featured Projects
          </h1>
          <p className="text-2xl md:text-4xl font-semibold mt-6">
            From bold ideas to real-world impact, our projects reflect
            creativity, innovation, and precision. Each one tells a story of
            vision turned into reality, shaping the future across industries and
            communities.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 my-20">
          {projects?.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
