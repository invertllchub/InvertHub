"use client"

import { useEffect, useMemo, useState } from "react";
// Components
import DeleteBtn from "@/components/dashboard/DeleteBtn"
import UpdateBtn from "@/components/dashboard/UpdateBtn";
import ToolBar from "@/components/dashboard/ToolBar"
// Types
import { TeamMember } from "@/types/team";
// Hooks
import { useSelection } from "@/hooks/useSelection";

function page() {
  const [ team, setTeam] = useState<TeamMember []>([])
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
  } = useSelection(team);


  const fetchData = async () => {
    const respone = await fetch('/team.json')
    const result = await respone.json()
    setTeam(result)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredUsers = useMemo(() => {
    if(!team.length) return[];
    if(!searchValue) return team;
    return team.filter(u => u.name.toLowerCase().includes(searchValue.toLowerCase()));
  }, [team, searchValue])

    
    return (
          <div className='pt-22 md:pt-12 md:ml-50 p-6 md:p-12 min-h-screen bg-[#D6F4ED] overflow-hidden'>
            <ToolBar
            title="users"
            allSelected={allSelected}
            someSelected={someSelected}
            setSearchValue={setSearchValue}
            >
              <DeleteBtn selectedIds={selected} onDeleted={handleDeleteAll} page={'users'}/>
            </ToolBar>

            {/* 🖥️ TABLE VIEW (Desktop) */}
            <div className="hidden md:block w-full mt-8 overflow-x-auto">
              <div className="grid grid-cols-[50px_1fr_150px_150px_150px_150px] gap-8 my-4 font-semibold text-gray-700 pb-2">
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    ref={headerCheckboxRef}
                    checked={allSelected}
                    onChange={toggleAll}
                    className="w-4 h-4 cursor-pointer accent-blue-700"
                  />
                </div>
                <div>Name</div>
                <div>Job Title</div>
                <div>Role</div>
                <div>Articles</div>
                <div className="text-center">Actions</div>
              </div>

              {filteredUsers.map((user, index) => (
                <div
                key={user.id}
                className={`grid grid-cols-[50px_1fr_150px_150px_150px_150px] gap-8 py-4 my-1.5 shadow-sm text-gray-600 hover:bg-gray-50 transition-all duration-150 
                  ${selected.includes(user.id) ? "bg-blue-50" : "bg-white"}
                  ${index === 0 ? "rounded-t-lg" : ""}
                  ${index === filteredUsers.length - 1 ? "rounded-b-lg" : ""}
                  `}
                >
                  <div className="flex justify-center">
                    <input
                    type="checkbox"
                    checked={selected.includes(user.id)}
                    onChange={() => toggleOne(user.id)}
                    className="w-4 cursor-pointer accent-blue-700"
                    />
                  </div>
                  <div className="flex items-center font-medium">{user.name}</div>
                  <div className="flex items-center">{user.jobTitle}</div>
                  <div className="flex items-center">{user.role}</div>
                  <div className="flex items-center">{user.articles}</div>
                  <div className="flex justify-center gap-4">
                    <DeleteBtn page={'users'} id={user.id} onDeleted={() => handleDeleteOne(user.id)} />
                    <UpdateBtn page="users" id={user.id} />
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                  No user found.
                </div>
              )}

            </div>

            {/* 📱 CARD VIEW (Mobile) */}
            <div className="block md:hidden mt-6  space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`relative bg-white p-5 rounded-xl shadow-sm border transition-all duration-200 ${
                    selected.includes(user.id)
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selected.includes(user.id)}
                    onChange={() => toggleOne(user.id)}
                    className="absolute top-4 left-4 w-4 h-4 accent-blue-700 cursor-pointer"
                  />

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 pl-6 mb-2">
                    {user.name}
                  </h3>

                  <p className="text-sm text-gray-600 pl-6">
                    <span className="font-medium">Job Title:</span> {user.jobTitle}
                  </p>
                  <p className="text-sm text-gray-600 pl-6">
                    <span className="font-medium">Role:</span> {user.role}
                  </p>
                  <p className="text-sm text-gray-600 pl-6 mb-4">
                    <span className="font-medium">Articles:</span> {user.articles}
                  </p>

                  {/* Actions */}
                  <div className="flex justify-end gap-3">
                    <DeleteBtn page={'users'} id={user.id} onDeleted={() => handleDeleteOne(user.id)} />
                    <UpdateBtn page="users" id={user.id} />
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center text-gray-500 py-10">No users found.</div>
              )}
            </div>

          </div>
      )
}

export default page
