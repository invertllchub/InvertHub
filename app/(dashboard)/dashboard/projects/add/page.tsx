"use client";
import React from "react";
import AddProjectForm from "@/components/dashboard/projectsComponents/AddProjectForm";


export default function AddProjectPage() {

  return (
    <div className='pt-22 md:pt-12 md:ml-50 p-6 md:p-12 min-h-screen bg-[#D6F4ED] overflow-hidden'>
        <div className="w-full bg-white rounded-lg shadow-md flex md:flex-row items-center justify-between gap-6 p-6">
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#473472]">
            ADD YOUR PROJECT
          </h1>
          <button
            form="add-project-form"
            type="submit"
            className="px-6 py-3 bg-[#473472] hover:bg-[#53629E] transition-colors text-white rounded-lg col-start-1 cursor-pointer"
          >
            Save Changes
          </button>
        </div>

        <div className="my-10 bg-white rounded-lg shadow-md">
          <AddProjectForm />
        </div>
    </div>
  );
}
