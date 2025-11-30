"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Cookies
import Cookies from "js-cookie";
// Icons
import { Pencil } from "lucide-react";
// Hooks & React Query
import useGetUser from "@/hooks/users/useGetUser";
// Loading and Error States
import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";


const team = [
  { name: "John Doe", job: "Back-End Developer", img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg" },
  { name: "Jane Smith", job: "UI/UX Designer", img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg" },
  { name: "Alice Johnson", job: "QA Engineer", img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg" },
];

function ProfilePage() {
  const defaultImage = "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg";
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
    <div className="min-h-screen bg-(--secondary) p-6 md:p-12 ml-50 ">
      <div className="items-stretch grid grid-cols-1 md:grid-cols-2 gap-8 h-full min-h-[calc(100vh-6rem)]">

        {/* ----- Left: Profile + Personal Info ----- */}
        <div className="relative h-full bg-white rounded-3xl shadow-lg flex flex-col items-center p-6 gap-6">
          
            <Link
            href={`/dashboard/profile/${user?.id}/edit`}
            >
              <Pencil size={18} className="absolute top-5 right-5 text-gray-500 cursor-pointer" />
            </Link>
            <div className="w-full flex items-center justify-between p-12">

                {/* User Image */}
                <div className="relative w-60 h-60 rounded-2xl overflow-hidden shadow-md">
                  <Image 
                  src={user?.imageUrl || defaultImage} 
                  alt="User" 
                  fill 
                  className="object-cover" 
                  />
                </div>
                {/* Basic Info */}
                <div className="text-center flex flex-col gap-2 p-10">
                  <h1 className="text-3xl font-bold text-gray-800">{user?.fullName}</h1>
                  <p className="text-gray-500 text-lg">{user?.jobTitle}</p>
                  <p>Email: <span className="text-black font-medium">{user?.email}</span></p>
                  <p>Phone: <span className="text-black font-medium">{user?.phoneNumber}</span></p>
                </div>

            </div>
          


          {/* Personal Info Card */}
          <div className="w-full bg-gray-50 rounded-2xl p-4 shadow-inner flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-700">Personal Info</h2>
                
            </div>
            <div className="border-t border-gray-200 my-2" />
            <div className="flex flex-col gap-1 text-gray-600">
              <p><span className="font-semibold text-gray-800">Gender:</span> {user?.gender}</p>
              <p><span className="font-semibold text-gray-800">Age:</span> {user?.age}</p>
              <p><span className="font-semibold text-gray-800">Address:</span> {user?.address}</p>
              <p><span className="font-semibold text-gray-800">Role:</span> {user?.role}</p>
            </div>
          </div>
        </div>

        {/* ----- Right: Team ----- */}
        <div className="flex flex-col gap-6 h-full">
          <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-gray-700">Team</h2>
            <div className="border-t border-gray-200 my-2" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {team.map((member, i) => (
                <div key={i} className="flex flex-col items-center gap-2 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image src={member.img} alt={member.name} fill className="object-cover" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800">{member.name}</h4>
                  <p className="text-xs text-gray-500">{member.job}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
