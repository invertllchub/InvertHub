"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// Components
import GoBackBtn from "@/components/dashboard/Buttons/GoBackBtn";
import EditUserForm from "@/components/dashboard/usersComponents/EditUserForm";
import EditEmail from "@/components/dashboard/usersComponents/EditEmail";
import EditPassword from "@/components/dashboard/usersComponents/EditPassword";
import DropDownBtn from "@/components/dashboard/Buttons/DropDownBtn";
// React Query & Hooks
import useGetUser from "@/hooks/users/useGetUser";
// Loading & Error State
import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";



function page() {
  const [active, setActive] = useState(true);
  const options = [
    { label: "Active", value: "true" },
    { label: "Disabled", value: "false" },
  ] as const;

  const params = useParams();
  const userID = params.id as string;
  const {data: user, isLoading, isError} = useGetUser(userID, {
    enabled: userID !== "",  
  });
  

  useEffect(() => {
    if (user?.isActive !== undefined) {
      setActive(user.isActive);
    }
  }, [user]);

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
    <div className="pt-22 md:pt-12 md:ml-50 p-4 md:p-20 min-h-screen bg-(--secondary) overflow-hidden">
      <div
        className="w-full bg-white flex flex-col md:flex-row items-center justify-between gap-6 p-6 
            rounded-t-lg shadow-md border-b border-gray-500"
      >
        <div className="flex items-center justify-center gap-8">
          <GoBackBtn />
          <div className="text-gray-500">users list / Update user</div>
        </div>
        <DropDownBtn<"true" | "false">
        value={String(active) as "true" | "false"}
        options={options}
        onChange={(v) => setActive(v === "true")}
        />
      </div>
        {user && 
          <div>
            <div className="bg-white mb-10 rounded-b-lg  shadow-md p-6 md:p-12">
              <EditUserForm  user={user} status={active}/>
            </div>
            <div className="bg-white mb-10 rounded-lg shadow-md p-6 md:p-12">
              <EditEmail user={user}/>
            </div>
            <div className="bg-white mb-10 rounded-lg shadow-md p-6 md:p-12">
              <EditPassword user={user}/>
            </div>
          </div>
        }
      </div>
  );
}

export default page;
