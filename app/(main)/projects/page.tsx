"use client";

import dynamic from "next/dynamic";
// types
import { Project } from "../../../types/project";
//components
const ProjectCard = dynamic(
  () => import("@/components/main/projectPage/ProjectCard"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

// React Query Hook
import useGetProjects from "@/hooks/projects/useGetProjects";
// Components
import LoadingSpinner from "@/components/states/LoadingSpinner";
import Header from "@/components/main/Header";

function Page() {
  const {data} = useGetProjects();
  const projects = data?.data?.data || [];

  return (
    <div className='w-full py-30 px-4 md:px-20 overflow-x-hidden'>
      <Header 
      title="Featured Projects"
      paragraph="From bold ideas to real-world impact, our projects reflect
        creativity, innovation, and precision. Each one tells a story of
        vision turned into reality, shaping the future across industries and
        communities."
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 my-20 ">
        {projects?.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Page;
