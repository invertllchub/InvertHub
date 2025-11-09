import React from "react";
import { Job } from "@/types/jobs";
import ShareButton from "./ShareButton";

type JobProps = {
  job: Job;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function JobDetails({ job, setShowForm }: JobProps) {
  return (
    <div>
      <div className="w-10/12 mx-auto my-10 bg-white p-6 rounded-lg shadow">
        <div className="my-5">
          <h2 className="text-2xl font-bold mb-4">Job Description</h2>
          {job?.description ? (
            <p>{job.description}</p>
          ) : (
            <p className="text-gray-500">
              No description available for this job.
            </p>
          )}
        </div>
        <div className="my-5">
          <h2 className="text-2xl font-bold mb-4">Key Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {job?.keyResponsibilities.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
        <div className="my-5">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {job?.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
        <div className="my-5">
          <h2 className="text-2xl font-bold mb-4">Benefits</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {job?.benefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Buttons */}
      <div className="w-6/12 md:w-3/12 flex flex-col mx-auto gap-6 my-10">
        <button
          onClick={() => setShowForm(true)}
          className="py-4 px-4 rounded-md shadow-md bg-black text-white 
          font-bold text-lg text-center  hover:bg-gray-800 transition cursor-pointer"
        >
          Apply
        </button>
        <ShareButton title={job.title} />
      </div>
    </div>
  );
}

export default JobDetails;
