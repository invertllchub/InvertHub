"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Mail, Bell, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import useGetUser from "@/hooks/users/useGetUser";
import Cookies from "js-cookie";
import LogoutButton from "../Buttons/LogoutButton";

function Toolbar() {
    const defaultImage =
    "https://res.cloudinary.com/dyfregti9/image/upload/v1761832027/INVERT-HUB/zvakmojuzfa5t9ty85r9.jpg";

    const userID = Cookies.get("id") || "";
    const { data: user } = useGetUser(userID);

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
            {/* Search */}
            <div className="w-1/2">
                <div className="w-full md:w-6/12 relative bg-white rounded-full">
                    <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-10 py-3.5 md:py-3 outline-none border border-(--secondary) rounded-full"
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 left-2">
                        <Search size={20} />
                    </div>
                </div>
            </div>

            {/* Icons + Profile */}
            <div className="flex items-center justify-between gap-6">
                <div className="flex gap-2 md:gap-4">
                    <Bell />
                    <Mail />
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                    className="flex items-center justify-center w-15 h-15 rounded-full overflow-hidden border border-gray-200 cursor-pointer"
                    onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <Image
                        title="Edit Profile"
                        alt="profile picture"
                        src={user?.imageUrl || defaultImage}
                        width={50}
                        height={50}
                        className="object-cover rounded-full"
                        />
                    </button>

                    {/* Dropdown menu */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-3 py-4 px-4 hover:bg-gray-100 transition"
                            >
                                <User size={20}/>
                                <span className="whitespace-nowrap">Profile</span>
                            </Link>
                            <div
                            className="w-full hover:bg-gray-100 transition"
                            >
                                <LogoutButton />
                            </div>
                        </div>
                    )}
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
