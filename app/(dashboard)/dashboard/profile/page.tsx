"use client";

import { useState, useEffect } from "react";
// Cookies
import Cookies from "js-cookie";
// React Query & Hooks
import useGetUser from "@/hooks/users/useGetUser";
// Loading & Error states
import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";
// components
import ProfileCard from "@/components/dashboard/profile/ProfileCard";
import TeamCard from "@/components/dashboard/profile/TeamCard";
import MyEvents from "@/components/dashboard/profile/MyEvents";

export default function ProfilePage() {
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    setUserID(Cookies.get("id") ?? null);
  }, []);

  const {
    data: user,
    isError,
    isLoading,
  } = useGetUser(userID ?? "", {
    enabled: !!userID,
  });

  if (isLoading) {
    return (
      <div className="ml-0 md:ml-50 flex justify-center items-center h-screen">
        <IsLoadingState />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="ml-0 md:ml-50 flex justify-center items-center h-screen">
        <ErrorState />
      </div>
    );
  }

return (
  <div className="bg-(--secondary) p-4 pt-20 md:p-12 ml-0 md:ml-50 min-h-screen">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch min-h-[80vh]">

      {/* Left Column */}
      <div className="flex">
        {user && <ProfileCard user={user} />}
      </div>

      {/* Right Column */}
      <div className="flex flex-col h-full gap-5">

        {/* Team */}
        <div className="flex-1 bg-white rounded-3xl shadow-lg p-4 md:p-6 flex flex-col">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 text-center md:text-left">
            Team
          </h2>
          <div className="border-t border-gray-200 my-2" />
          <TeamCard />
        </div>

        {/* My Events */}
        <div className="flex-1 bg-white rounded-3xl shadow-lg p-4 md:p-6 flex flex-col">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 text-center md:text-left">
            My Events
          </h2>
          <div className="border-t border-gray-200 my-2" />
          <MyEvents />
        </div>

      </div>
    </div>
  </div>
);

}
