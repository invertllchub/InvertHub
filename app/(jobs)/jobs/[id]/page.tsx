"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
// Types
import { Job } from "@/types/jobs";
// Icons
import { Hourglass, MapPin, Calendar, Clock } from "lucide-react";
//components
import Logo from "@/components/main/Logo";
import JobApplication from "@/components/jobs/JobApplication";
import JobDetails from "@/components/jobs/JobDetails";
// React Query
import useGetJobs from "@/hooks/useGetJobs";

function Page() {
  const [showForm, setShowForm] = useState(false);
  const {data : jobs = [], isLoading, error} = useGetJobs();
  const params = useParams();
  const job = jobs.find((j) => String(j.id) === params.id);

  const jobBannerDetails = [
    {icon: <Hourglass size={20} />, label: job?.employmentType},
    {icon: <MapPin size={20} />, label: job?.location},
    {icon: <Calendar size={20} />, label: job?.datePosted},
    {icon: <Clock size={20} />, label: job?.closingDate},
  ]

    if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold animate-pulse">Loading Jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl text-red-500 font-semibold">Failed to load Jobs 😞</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-screen md:h-[80vh]">
        {/* Logo */}
        <Logo isDark={true}/>

        {/* Panner */}
        <Image
          alt="jobs picture"
          src="https://res.cloudinary.com/dyfregti9/image/upload/v1758050776/Home-Sec2_invertstudios_p72g4j.png"
          fill
          priority
          className="object-cover"
        />

        <div
          className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm
          bg-white/10 border border-white/30 shadow-lg text-white"
        >
          <h1 className="w-7/12 text-start mx-auto text-xl md:text-5xl font-bold drop-shadow-lg">
            {job?.title} - {job?.location}
          </h1>
          <div className="w-7/12 mx-auto mt-5 flex flex-col md:flex-row items-start gap-6">
            {jobBannerDetails?.map((item, i) => {
              return (
                <div key={i} className="flex gap-2">
                  <div className="w-6 h-6 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>
              )
            })}
          </div>
          <div className="w-7/12 mx-auto mt-10">
            <p className="text-md md:text-xl font-semibold">
              We are currently looking for an Advanced {job?.title} to join us.
            </p>
          </div>
        </div>
      </div>

      <div className="py-4 mb-2">
        <div className="w-full md:w-9/12 flex items-center justify-center md:justify-normal  gap-4 mx-auto">
          <button onClick={() => setShowForm(false)}>
            <p
              className={`text-lg font-semibold cursor-pointer p-4
              ${!showForm ? "border-b-2" : ""}`}
            >
              Job details
            </p>
          </button>
          <button
            onClick={() => setShowForm(true)}
            className={`p-4 font-bold text-lg text-center cursor-pointer 
            ${
              showForm
                ? "rounded-none shadow-none bg-transparent text-black border-b-2"
                : "rounded-md shadow-md bg-black text-white hover:bg-gray-800 transition"
            }
            `}
          >
            {!showForm ? "Apply" : "Application"}
          </button>
        </div>
        {/* Divider */}
        <div className="w-full h-px bg-gray-600" />
      </div>

      {/* Conditional UI */}
      {job ? (
        showForm ? (
          <JobApplication job={job} />
        ) : (
          <JobDetails job={job} setShowForm={setShowForm} />
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Page;
