"use client"


import { useParams } from "next/navigation";
// Cokkies
import Cookies from "js-cookie";
// Formate Date Function
import formatDate from "@/utils/FormatDate";
// Components
import EditBtn from "@/components/dashboard/Buttons/EditBtn";
import DeleteBtn from "@/components/dashboard/Buttons/DeleteBtn";
// React Query & Hooks
import useDeleteProject from '@/hooks/projects/useDeleteProject';
import useGetProject from '@/hooks/projects/useGetProject';
// Loading & Error States
import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";
import Link from "next/link";
import Image from "next/image";


function page() {
    const defaultProjectImage = "https://res.cloudinary.com/dyfregti9/image/upload/v1764634158/default-ui-image-placeholder-wireframes-600nw-1037719192_hbb5qj.webp"
    const role = Cookies.get("role");
    const { mutate } = useDeleteProject();
    const params = useParams();
    const ProjectID = params.id as string;

    const { data: project, isLoading, isError } = useGetProject(ProjectID, {
        enabled: ProjectID !== "",
    });

    if (isError)
        return (
            <div className="ml-50 flex justify-center items-center h-screen">
                <ErrorState />
            </div>
        );

    if (isLoading)
        return (
            <div className="ml-50 flex justify-center items-center h-screen">
                <IsLoadingState />
            </div>
        );


    return (
        <div className="bg-(--secondary) p-4 pt-20 md:p-14 ml-0 md:ml-50 min-h-screen md:h-screen">
            <div className="bg-white rounded-3xl shadow-lg p-6 h-full flex flex-col justify-between gap-6">

            <div className="flex justify-between items-start gap-4">
                    <Link 
                    href={project?.link || "#"}
                    target="_blanck"
                    className="text-2xl font-bold text-gray-800"
                        >{project?.name}
                    </Link>
                <div className="flex items-center gap-4">
                {project &&
                    <EditBtn 
                    page="projects"
                    id={project?.id}
                    details="project-details"
                    />
                }
                {role === "Admin" && 
                    <div>
                    {project && 
                        <DeleteBtn 
                        item="Project" 
                        id={project.id}
                        deleteFn={mutate}
                        />
                    }
                    </div>
                }
                </div>
            </div>

                <div className="relative w-full h-60 md:h-80 rounded-2xl overflow-hidden">
                    <Image
                    src={project?.imageUrl || defaultProjectImage}
                    alt={project?.name || ""}
                    fill
                    className="object-cover"
                    />
                </div>

                <p className="text-gray-700 text-xl leading-relaxed text-center">
                    {project?.description}
                </p>

                {/* -------- Footer / Info Grid -------- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
                    <InfoItem label="Created At" value={project?.createdAt ? formatDate(project.createdAt) : "—"} />
                    <InfoItem label="Created By" value={project?.createdBy || "—"} />
                    <InfoItem label="Updated At" value={project?.updatedAt ? formatDate(project.updatedAt) : "—"} />
                    <InfoItem label="Updated By" value={project?.updatedBy || "—"} />
                </div>
            </div>
        </div>
    );
}

export default page


function InfoItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between bg-gray-50 p-3 rounded-xl">
      <span className="font-medium">{label}</span>
      <span>{value || "—"}</span>
    </div>
  );
}