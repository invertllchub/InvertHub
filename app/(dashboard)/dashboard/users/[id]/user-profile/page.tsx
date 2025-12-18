"use client";

import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";
import useGetUser from "@/hooks/users/useGetUser";
import { useParams } from "next/navigation";
import DeleteBtn from "@/components/dashboard/Buttons/DeleteBtn";
import useDeleteUser from "@/hooks/users/useDeleteUser";
import RecentActivity from "@/components/dashboard/homeComponents/RecentActivity";
import useGetUserActivities from "@/hooks/profile/useGetUserActivities";
// Cokkies
import Cookies from "js-cookie";
// Formate Date Function
import formatDate from "@/utils/FormatDate";
// Components
import EditBtn from "@/components/dashboard/Buttons/EditBtn";

export default function Page() {
    const role = Cookies.get("role");
    const {data: activities = []} = useGetUserActivities();
    const { mutate } = useDeleteUser();
    const params = useParams();
    const userID = params.id as string;

    const { data: user, isLoading, isError } = useGetUser(userID, {
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
        <div className="bg-(--secondary) p-4 pt-20 md:p-14 ml-0 md:ml-50 min-h-screen md:h-screen">
            <div className="bg-white rounded-3xl shadow-lg p-6 h-full flex flex-col justify-between gap-6">

                <div className="flex flex-row justify-between items-start gap-4">
                    <div>
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {user?.fullName}
                            </h2>

                            <span
                                className={`px-4 py-1 rounded-full text-sm font-medium
                                ${user?.isActive === true
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {user?.isActive ? "Active" : "disabled"}
                            </span>
                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                            {user?.email}
                        </p>
                    </div>

                <div className="flex items-center gap-4">
                    {user &&
                        <EditBtn 
                        page="users"
                        id={user?.id}
                        details="user-profile"
                        />
                    }
                    {role === "Admin" && 
                        <div>
                        {user && 
                            <DeleteBtn 
                            item="User" 
                            id={user.id}
                            deleteFn={mutate}
                            />
                        }
                        </div>
                    }
                </div>
            </div>

                <div className="flex flex-col md:flex-row gap-6 flex-1">

                    <div className="flex-1 flex flex-col gap-6">
                        <Detail label="Jop Title" value={user?.jobTitle} />
                        <Detail label="Role" value={user?.role} />
                        <Detail label="Phone" value={user?.phoneNumber} />
                        <Detail label="Gender" value={user?.gender} />
                        <Detail label="Age" value={user?.age} />
                        <Detail label="Address" value={user?.address} />
                    </div>

                    <div className="w-full md:w-6/12 bg-gray-50 rounded-2xl p-4 flex flex-col">

                        <h3 className="text-lg font-semibold text-gray-700 text-center md:text-left">
                            Recent Activities
                        </h3>

                        <div className="border-t my-3" />

                        <div className="flex-1 overflow-y-auto">
                            <RecentActivity activities={activities} />
                        </div>

                    </div>
                </div>

                <div className="pt-4 border-t text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-2">

                    <span>
                        Created:
                        {" "}
                        {user?.createdAt
                            ? formatDate(user?.createdAt)
                            : "—"}
                    </span>

                    <span>
                        Created-By:
                        {" "}
                        {user?.createdBy
                            ? user.createdBy
                            : "—"}
                    </span>

                    <span>
                        Updated:
                        {" "}
                        {user?.updatedAt
                            ? formatDate(user?.updatedAt)
                            : "—"}
                    </span>

                    <span>
                        Updated-By:
                        {" "}
                        {user?.updatedBy
                            ? user.updatedBy
                            : "—"}
                    </span>

                    <span>
                        User ID:
                        {" "}
                        {user?.id}
                    </span>

                </div>

            </div>
        </div>
    );
}

function Detail({ label, value }: { label: string, value?: string | number }) {
    return (
        <div className="flex justify-between bg-gray-50 p-3 rounded-xl">
            <span className="font-medium text-gray-500">{label}</span>
            <span>{value || "—"}</span>
        </div>
    );
}
