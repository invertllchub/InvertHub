"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
// Icons
import { Settings, Bell } from "lucide-react";
// React Query & Hooks
import useGetUser from "@/hooks/users/useGetUser";
// Cookies
import Cookies from "js-cookie";
// Components
import LogoutButton from "../Buttons/LogoutButton";


function Toolbar() {
    const defaultImage =
    "https://res.cloudinary.com/dyfregti9/image/upload/v1761832027/INVERT-HUB/zvakmojuzfa5t9ty85r9.jpg";

    const userID = Cookies.get("id") || "";
    const {data: user} = useGetUser(userID, {
        enabled: userID !== "",  
    });

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full h-22 bg-white rounded-full shadow-md flex items-center justify-between px-5 md:px-10">

            <div className="flex items-center gap-3">
                <div 
                className="relative flex items-center" ref={dropdownRef}
                >
                    <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <Settings className="cursor-pointer hover:rotate-45"/>
                    </button>

                    {/* Dropdown menu */}
                    {isOpen && (
                        <div className="absolute -left-2 top-6 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <div
                            className="w-full hover:bg-gray-100 transition"
                            >
                                <LogoutButton />
                            </div>
                        </div>
                    )}
                </div>
                <Bell />
            </div>
            
            {/* Icons + Profile */}
            <div className="flex items-center justify-between gap-6">


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

export default Toolbar;
