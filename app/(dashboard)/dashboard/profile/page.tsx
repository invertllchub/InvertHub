"use client";

import { useEffect, useState } from "react";
// Cookies
import Cookies from "js-cookie";
// Hooks & React Query
import useGetUser from "@/hooks/users/useGetUser";
// Loading and Error States
import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";
// Components
import ProfileCard from "@/components/dashboard/profile/ProfileCard";
import TeamCard from "@/components/dashboard/profile/TeamCard";


function ProfilePage() {
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const idFromCookie = Cookies.get("id");
    if (idFromCookie) setUserID(idFromCookie);
  }, []);

  const {data: user, isLoading, isError} = useGetUser(userID, {
    enabled: userID !== "",  
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
    <div className="bg-(--secondary) p-4 pt-20 md:p-12 ml-0 md:ml-50 min-h-screen md:h-screen ">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:h-full">

        {/* ----- Left: Profile ----- */}
        {user && (
          <div className="w-full md:w-1/2 md:h-full">
            <ProfileCard user={user} />
          </div>
        )}

        {/* ----- Right: Team ----- */}
        <div className="w-full md:w-1/2 md:h-full">
          <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6 flex flex-col gap-4 md:h-full">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 text-center md:text-left">
              Team
            </h2>
              
            <div className="border-t border-gray-200 my-2" />
                
            <div className="flex-1">
              <TeamCard />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
