"use client";

import Link from "next/link";
import Image from "next/image";
// Icons
import { Mail , Bell, Search } from "lucide-react";
// React Query & Hooks
import useGetUser from "@/hooks/users/useGetUser";
// Cookies
import Cookies from "js-cookie";



function HomePageToolbar() {
    const defaultImage =
    "https://res.cloudinary.com/dyfregti9/image/upload/v1761832027/INVERT-HUB/zvakmojuzfa5t9ty85r9.jpg";

    const userID = Cookies.get("id") || "";
    const {data: user} = useGetUser(userID, {
        enabled: userID !== "",  
    });


    return (
        <div className="w-full h-22 bg-white rounded-full shadow-md flex items-center justify-between px-5 md:px-10">

            <div className='hidden md:block md:w-4/12 relative bg-white rounded-full'>
                <input
                type="text"
                placeholder='Search'
                className="w-full px-10 py-3.5 md:py-3 outline-none border border-(--secondary) rounded-full"
                />
                <div className='absolute top-1/2 -translate-y-1/2 left-2'>
                    <Search size={20} />
                </div>
            </div>
            
            {/* Icons + Profile */}
            <div className="flex items-center gap-4 justify-between md:justify-end w-full">

                <div className="flex items-center gap-3">
                    <Bell className="cursor-pointer"/>
                    <Mail className="cursor-pointer"/>
                </div>

                {/* Profile Dropdown */}
                <div>
                    <Link
                    href={'/dashboard/profile'}
                    className="flex items-center justify-center w-15 h-15 rounded-full overflow-hidden border border-gray-200 cursor-pointer"
                    >
                        <Image
                        title="Profile"
                        alt="profile picture"
                        src={user?.imageUrl || defaultImage}
                        width={50}
                        height={50}
                        className="object-cover rounded-full"
                        />
                    </Link>
                </div>

                {/* User info */}
                <div className="hidden md:block">
                    <h1 className="font-semibold">{user?.fullName}</h1>
                    <p className="text-gray-600">{user?.email}</p>
                </div>
            </div>
        </div>
    );
}

export default HomePageToolbar;
