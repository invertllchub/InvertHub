"use client";
import { useState, useMemo, useEffect } from "react";
// Components
import ToolBar from "@/components/dashboard/ToolBar";
import DeleteBtn from "@/components/dashboard/DeleteBtn";
import UpdateBtn from "@/components/dashboard/UpdateBtn";
// Hook
import { useSelection } from "@/hooks/useSelection";
// Types
import { Job } from "@/types/jobs";

function JobsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [ jobs, setJobs] = useState<Job []>([])
  
  const {
    selected,
    toggleAll,
    toggleOne,
    handleDeleteOne,
    handleDeleteAll,
    allSelected,
    someSelected,
    headerCheckboxRef,
  } = useSelection(jobs);

    const fetchData = async () => {
      const respone = await fetch('/jobs.json')
      const result = await respone.json()
      setJobs(result)
    }
  
    useEffect(() => {
      fetchData()
    }, [])

    
  const filteredJobs = useMemo(() => {
    if(!jobs.length) return[];
    if(!searchValue) return jobs;
    return jobs.filter(j => j.title.toLowerCase().includes(searchValue.toLowerCase()));
  }, [jobs, searchValue])


  return (
          <div className='pt-22 md:pt-12 md:ml-50 p-6 md:p-12 min-h-screen bg-[#D6F4ED] overflow-hidden'>
            <ToolBar
            title="jobs"
            allSelected={allSelected}
            someSelected={someSelected}
            setSearchValue={setSearchValue}
            >
                <DeleteBtn selectedIds={selected} onDeleted={handleDeleteAll} page={'jobs'}/>
            </ToolBar>

            {/* 🖥️ TABLE VIEW (Desktop) */}
            <div className="hidden md:block w-full mt-8 overflow-x-auto">
              <div className="grid grid-cols-[50px_1fr_150px_150px_150px_150px_150px] gap-8 my-4 font-semibold text-gray-700 pb-2">
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    ref={headerCheckboxRef}
                    checked={allSelected}
                    onChange={toggleAll}
                    className="w-4 h-4 cursor-pointer accent-blue-700"
                  />
                </div>
                <div>Title</div>
                <div>Employment Type</div>
                <div>Status</div>
                <div>Date Posted</div>
                <div>Closing Date</div>
                <div className="text-center">Actions</div>
              </div>

              {filteredJobs.map((job, index) => (
                <div
                key={job.id}
                className={`grid grid-cols-[50px_1fr_150px_150px_150px_150px_150px] gap-8 py-4 my-1.5 shadow-sm text-gray-600 hover:bg-gray-50 transition-all duration-150 
                  ${selected.includes(job.id) ? "bg-blue-50" : "bg-white"}
                  ${index === 0 ? "rounded-t-lg" : ""}
                  ${index === filteredJobs.length - 1 ? "rounded-b-lg" : ""}
                  `}
                >
                  <div className="flex justify-center">
                    <input
                    type="checkbox"
                    checked={selected.includes(job.id)}
                    onChange={() => toggleOne(job.id)}
                    className="w-4 cursor-pointer accent-blue-700"
                    />
                  </div>
                  <div className="flex items-center font-medium">{job.title}</div>
                  <div className="flex items-center">{job.employmentType}</div>
                  <div className="flex items-center">{job.status}</div>
                  <div className="flex items-center">{job.datePosted}</div>
                  <div className="flex items-center">{job.closingDate}</div>
                  <div className="flex justify-center gap-4">
                    <DeleteBtn page={'jobs'} id={job.id} onDeleted={() => handleDeleteOne(job.id)} />
                    <UpdateBtn page="jobs" id={job.id} />
                  </div>
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                  No jobs found.
                </div>
              )}

            </div>

            {/* 📱 CARD VIEW (Mobile) */}
            <div className="block md:hidden mt-6  space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`relative bg-white p-5 rounded-xl shadow-sm border transition-all duration-200 ${
                    selected.includes(job.id)
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selected.includes(job.id)}
                    onChange={() => toggleOne(job.id)}
                    className="absolute top-4 left-4 w-4 h-4 accent-blue-700 cursor-pointer"
                  />

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 pl-6 mb-2">
                    {job.title}
                  </h3>

                  <p className="text-sm text-gray-600 pl-6">
                    <span className="font-medium">Job Status:</span> {job.status}
                  </p>
                  <p className="text-sm text-gray-600 pl-6">
                    <span className="font-medium">Date Posted:</span> {job.datePosted}
                  </p>
                  <p className="text-sm text-gray-600 pl-6 mb-4">
                    <span className="font-medium">Closing Date:</span> {job.closingDate}
                  </p>

                  {/* Actions */}
                  <div className="flex justify-end gap-3">
                    <DeleteBtn page={'jobs'} id={job.id} onDeleted={() => handleDeleteOne(job.id)} />
                    <UpdateBtn page="jobs" id={job.id} />
                  </div>
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center text-gray-500 py-10">No jobs found.</div>
              )}
            </div>

          </div>
  );
}

export default JobsPage;
