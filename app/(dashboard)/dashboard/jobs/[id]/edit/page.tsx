"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// Components
import EditJobForm from "@/components/dashboard/jobsComponents/EditjobForm";
import GoBackBtn from "@/components/dashboard/Buttons/GoBackBtn";
import DropDownBtn from "@/components/dashboard/Buttons/DropDownBtn";
import DeleteBtn from "@/components/dashboard/Buttons/DeleteBtn";
// Types
import { JobStatus } from "@/types/jobs";
// React Query & Hooks
import useGetJob from "@/hooks/jobs/useGetJob";
import useDeleteJob from "@/hooks/jobs/useDeleteJob";
// Cokkies
import Cookies from "js-cookie";
// Loading & Error States
import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";


function Page() {
  const [selectedOption, setSelectedOption] = useState<JobStatus>("Available");
  const jobOptions: { label: string; value: JobStatus }[] = [
    { label: "Available", value: "Available" },
    { label: "Not Available", value: "NotAvailable" },
  ];
  const { mutate } = useDeleteJob();
  const role = Cookies.get("role");
  const params = useParams();
  const jobID = params.id as string;
  const {data: job, isLoading, isError} = useGetJob(jobID, {
    enabled: jobID !== "",  
  });

  
  useEffect(() => {
    if (job?.status) {
      setSelectedOption(job.status as JobStatus);
    }
  }, [job]);

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
        className="w-full bg-white flex flex-col md:flex-row items-center justify-between gap-6 p-6 
            rounded-t-lg shadow-md border-b border-gray-500"
      >
        <div className="flex  items-center justify-center gap-8">
          <GoBackBtn />
          <div className="text-gray-500">Job list / Update job</div>
        </div>
        <DropDownBtn<JobStatus>
        value={selectedOption}
        options={jobOptions}
        onChange={setSelectedOption}
        />
      </div>
      <div className="mb-10">
        {job &&
          <div>
              <div className="bg-white mb-10 rounded-b-lg shadow-md p-6 md:p-12">
                <EditJobForm job={job} status={selectedOption} />
              </div>
              {role === "Admin" && 
                <div className="bg-white mb-10 rounded-lg shadow-md p-6 md:p-12">
                  <DeleteBtn 
                  item="Job" 
                  id={job.id}
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

export default Page;
