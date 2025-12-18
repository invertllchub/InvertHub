"use client";

import { useParams } from "next/navigation";
// Components
import GoBackBtn from "@/components/dashboard/Buttons/GoBackBtn";
import EditProfileForm from "@/components/dashboard/profile/EditProfileForm";
import EditEmail from "@/components/dashboard/usersComponents/EditEmail";
import EditPassword from "@/components/dashboard/usersComponents/EditPassword";
// React Query
import useGetUser from "@/hooks/users/useGetUser";
// Loading & Error State
import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";
// Cokkies
import Cookies from "js-cookie";


function page() {
  const params = useParams();
  const role = Cookies.get("role");
  const userID = params.id as string;
  const {data: user, isLoading, isError} = useGetUser(userID, {
    enabled: userID !== "",  
  });


  if (isError) {
    return (
      <div className="ml-0 md:ml-50 flex justify-center items-center h-screen">
        <ErrorState />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="ml-0 md:ml-50 flex justify-center items-center h-screen">
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
          <div className="text-gray-500">Update profile</div>
        </div>
      </div>
        {user && 
          <div>
            <div className="bg-white mb-10  shadow-md p-6 md:p-12">
              <EditProfileForm user={user} />
            </div>
            {role === "Admin" && 
              <div>
                <div className="bg-white mb-10  shadow-md p-6 md:p-12">
                  <EditEmail user={user}/>
                </div>
                <div className="bg-white mb-10 rounded-b-lg shadow-md p-6 md:p-12">
                  <EditPassword user={user}/>
                </div>
              </div>
            }
          </div>
        }
      </div>
  );
}

export default page;
