"use client"

import { useEffect, useMemo, useState } from "react";
// Components
import DeleteBtn from "@/components/dashboard/DeleteBtn"
import UpdateBtn from "@/components/dashboard/UpdateBtn";
import ToolBar from "@/components/dashboard/ToolBar"
// Types
import { Project } from "@/types/project";
// Hooks
import { useSelection } from "@/hooks/useSelection";

function page() {
  const [ projects, setProjects] = useState<Project []>([])
  const [searchValue, setSearchValue] = useState("");

  const {
    selected,
    toggleAll,
    toggleOne,
    handleDeleteOne,
    handleDeleteAll,
    allSelected,
    someSelected,
    headerCheckboxRef,
  } = useSelection(projects);


  const fetchData = async () => {
    const respone = await fetch('/projects.json')
    const result = await respone.json()
    setProjects(result)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredProjects = useMemo(() => {
    if(!projects.length) return[];
    if(!searchValue) return projects;
    return projects.filter(p => p.title.toLowerCase().includes(searchValue.toLowerCase()));
  }, [projects, searchValue])

    
    return (
          <div className='pt-22 md:pt-12 md:ml-50 p-6 md:p-12 min-h-screen bg-[#D6F4ED] overflow-hidden'>
            <ToolBar
            title="projects"
            allSelected={allSelected}
            someSelected={someSelected}
            setSearchValue={setSearchValue}
            >
              <DeleteBtn selectedIds={selected} onDeleted={handleDeleteAll} page={'projects'}/>
            </ToolBar>

            {/* 🖥️ TABLE VIEW (Desktop) */}
            <div className="hidden md:block w-full mt-8 overflow-x-auto">
              <div className="grid grid-cols-[50px_1fr_200px_200px] gap-8 my-4 font-semibold text-gray-700 pb-2">
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    ref={headerCheckboxRef}
                    checked={allSelected}
                    onChange={toggleAll}
                    className="w-4 h-4 cursor-pointer accent-blue-700"
                  />
                </div>
                <div>Project Name</div>
                <div>Project Link</div>
                <div className="text-center">Actions</div>
              </div>

              {filteredProjects.map((project, index) => (
                <div
                key={project.id}
                className={`grid grid-cols-[50px_1fr_200px_200px] gap-8 py-4 my-1.5 shadow-sm text-gray-600 hover:bg-gray-50 transition-all duration-150 
                  ${selected.includes(project.id) ? "bg-blue-50" : "bg-white"}
                  ${index === 0 ? "rounded-t-lg" : ""}
                  ${index === filteredProjects.length - 1 ? "rounded-b-lg" : ""}
                  `}
                >
                  <div className="flex justify-center">
                    <input
                    type="checkbox"
                    checked={selected.includes(project.id)}
                    onChange={() => toggleOne(project.id)}
                    className="w-4 cursor-pointer accent-blue-700"
                    />
                  </div>
                  <div className="flex items-center font-medium">{project.title}</div>
                  <div className="flex items-center">{project.link}</div>
                  <div className="flex justify-center gap-4">
                    <DeleteBtn page={'projects'} id={project.id} onDeleted={() => handleDeleteOne(project.id)} />
                    <UpdateBtn page="projects" id={project.id} />
                  </div>
                </div>
              ))}

              {filteredProjects.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                  No projects found.
                </div>
              )}

            </div>

            {/* 📱 CARD VIEW (Mobile) */}
            <div className="block md:hidden mt-6  space-y-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`relative bg-white p-5 rounded-xl shadow-sm border transition-all duration-200 ${
                    selected.includes(project.id)
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selected.includes(project.id)}
                    onChange={() => toggleOne(project.id)}
                    className="absolute top-4 left-4 w-4 h-4 accent-blue-700 cursor-pointer"
                  />

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 pl-6 mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-600 pl-6">
                    <span className="font-medium">Job Title:</span> {project.link}
                  </p>


                  {/* Actions */}
                  <div className="flex justify-end gap-3">
                    <DeleteBtn page={'projects'} id={project.id} onDeleted={() => handleDeleteOne(project.id)} />
                    <UpdateBtn page="projects" id={project.id} />
                  </div>
                </div>
              ))}

              {filteredProjects.length === 0 && (
                <div className="text-center text-gray-500 py-10">No projects found.</div>
              )}
            </div>

          </div>
      )
}

export default page
