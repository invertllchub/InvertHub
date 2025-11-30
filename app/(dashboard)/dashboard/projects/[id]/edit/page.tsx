"use client";

import { useParams } from "next/navigation";
// Components
import EditProjectForm from "@/components/dashboard/projectsComponents/EditProjectForm";
import GoBackBtn from "@/components/dashboard/Buttons/GoBackBtn";
import DeleteBtn from "@/components/dashboard/Buttons/DeleteBtn";
// React Query
import useGetProject from "@/hooks/projects/useGetProject";
import useDeleteProject from "@/hooks/projects/useDeleteProject";
// Cokkies
import Cookies from "js-cookie";
// Loading & Error State
import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";


export default function EditProjectPage() {
  const { mutate } = useDeleteProject();
  const role = Cookies.get("role");
  const params = useParams();
  const projectID = params.id as string;
  const {data: project, isLoading, isError} = useGetProject(projectID, {
    enabled: projectID !== "",  
  });


  if (isError) {
    return (
      <div className="ml-50 flex justify-center items-center h-screen">
        <ErrorState />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="ml-50 flex justify-center items-center h-screen">
        <IsLoadingState />
      </div>
    );
  }

  return (
    <div className="pt-22 md:pt-12 md:ml-50 p-6 md:p-20 min-h-screen bg-(--secondary) overflow-hidden">
      <div
        className="w-full bg-white flex md:flex-row items-center justify-between gap-6 p-6 
            rounded-t-lg shadow-md border-b border-gray-500"
      >
        <div className="flex items-center justify-center gap-8">
          <GoBackBtn />
          <div className="text-gray-500">project list / Update project</div>
        </div>
      </div>
      <div className="mb-10">
        {project &&
          <div>
            <div className="bg-white mb-10 rounded-lg shadow-md p-6 md:p-12">
              <EditProjectForm project={project} />
            </div>
              {role === "Admin" && 
                <div className="bg-white mb-10 rounded-lg shadow-md p-6 md:p-12">
                  <DeleteBtn 
                  item="Project" 
                  id={project.id}
                  deleteFn={mutate}
                  />
                </div>
              }
          </div>
        }
      </div>
    </div>
  );
}
