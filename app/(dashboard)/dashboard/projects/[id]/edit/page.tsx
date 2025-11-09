"use client";

import { useParams } from "next/navigation";
// Components
import EditProjectForm from "@/components/dashboard/projectsComponents/EditProjectForm";
// React Query
import useGetProjects from "@/hooks/useGetProjects";

export default function EditProjectPage() {
  const { data: projects = [], isLoading, error } = useGetProjects();
  const params = useParams();
  const projectId = Number(params.id); 
  const project = projects.find((p) => (p.id) === projectId);


  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold animate-pulse">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl text-red-500 font-semibold">Failed to load projects 😞</p>
      </div>
    );
  }

  return (
    <div className='pt-22 md:pt-12 md:ml-50 p-6 md:p-12 min-h-screen bg-[#D6F4ED] overflow-hidden'>
      <div className="w-full bg-white rounded-lg shadow-md flex md:flex-row items-center justify-between gap-6 p-6">
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#473472]">Edit Project</h1>
        <button
          form="edit-project-form"
          type="submit"
          className="px-6 py-3 bg-[#473472] hover:bg-[#53629E] transition-colors text-white rounded-lg col-start-1 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
      <div className="mb-10">
        {project ? (
          <div className="my-10 bg-white rounded-lg shadow-md">
            <EditProjectForm project={project} />
          </div>
        ) : (
          <p className="text-center text-gray-500">Project not found</p>
        )}
      </div>
    </div>
  );
}
