"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
// Icons
import { Pencil } from "lucide-react";
// Cokkies
import Cookies from "js-cookie";
// React Query & Hooks
import useGetJob from "@/hooks/jobs/useGetJob";
import useDeleteJob from "@/hooks/jobs/useDeleteJob";
// Components
import JobSection from "@/components/dashboard/jobsComponents/JobSection";
import DeleteBtn from "@/components/dashboard/Buttons/DeleteBtn";
// Formate Date Function
import formatDate from "@/utils/FormatDate";
// Loading & Error States
import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";
import EditBtn from "@/components/dashboard/Buttons/EditBtn";


export default function JobCard() {
    const role = Cookies.get("role");
    const { mutate } = useDeleteJob();
    const params = useParams();
    const jobID = params.id as string;
    const {data: job, isLoading, isError} = useGetJob(jobID, {
        enabled: jobID !== "",  
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
    <div className="bg-(--secondary) p-4 pt-20 md:p-14 ml-0 md:ml-50 min-h-screen md:h-screen">
        <div className="bg-white rounded-3xl shadow-lg p-6 h-full flex flex-col justify-between gap-6">

            <div className="flex flex-row justify-between items-start gap-4">
                <div>
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {job?.title}
                        </h2>
                        <span
                        className={`px-4 py-1 rounded-full text-sm font-medium w-fit flex items-center justify-center
                            ${job?.status === "Available"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                            }
                        `}
                        >
                            {job?.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        {job?.location} • {job?.employmentType} • {job?.experienceLevel}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {job &&
                        <EditBtn 
                        page="jobs"
                        id={job?.id}
                        details="job-details"
                        />
                    }
                    {role === "Admin" && 
                        <div>
                        {job && 
                            <DeleteBtn 
                            item="Job" 
                            id={job.id}
                            deleteFn={mutate}
                            />
                        }
                        </div>
                    }
                </div>

            </div>

            {/* -------- Description -------- */}

            <p className="text-xl text-gray-700 leading-relaxed text-center">
                {job?.description}
            </p>

            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

                    <div className="flex justify-between bg-gray-50 p-3 rounded-xl">
                        <span className="font-medium text-gray-500">Location</span>
                        <span>{job?.location}</span>
                    </div>

                    <div className="flex justify-between bg-gray-50 p-3 rounded-xl">
                        <span className="font-medium text-gray-500">Type</span>
                        <span>{job?.employmentType}</span>
                    </div>

                    <div className="flex justify-between bg-gray-50 p-3 rounded-xl">
                        <span className="font-medium text-gray-500">Experience</span>
                        <span>{job?.experienceLevel}</span>
                    </div>

                    <div className="flex justify-between bg-gray-50 p-3 rounded-xl">
                        <span className="font-medium text-gray-500">Closing</span>
                        <span>
                            {job?.closingDate
                            ? formatDate(job.closingDate)
                            : "—"}
                        </span>
                    </div>

                </div>
            </div>


            {/* -------- Sections -------- */}
            <div className="grid md:grid-cols-3 gap-6">

                {/* Responsibilities */}
                <JobSection
                title="Responsibilities"
                items={job?.keyResponsibilities}
                />

                {/* Requirements */}
                <JobSection
                title="Requirements"
                items={job?.requirements}
                />

                {/* Benefits */}
                <JobSection
                title="Benefits"
                items={job?.benefits}
                />

            </div>

            {/* -------- Footer -------- */}
            <div className="pt-4 border-t text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-2">

                <span>
                    Created:
                    {" "}
                    {job?.createdAt
                        ? formatDate(job.createdAt)
                        : "—"}
                </span>

                <span>
                    Created-By:
                    {" "}
                    {job?.createdBy
                        ? job.createdBy
                        : "—"}
                </span>

                <span>
                    Updated:
                    {" "}
                    {job?.updatedAt
                        ? formatDate(job.updatedAt)
                        : "—"}
                </span>

                <span>
                    Updated-By:
                    {" "}
                    {job?.updatedBy
                        ? job.updatedBy
                        : "—"}
                </span>

                <span>
                    Job ID:
                    {" "}
                    {job?.id}
                </span>

            </div>
        </div>
    </div>
);

}


