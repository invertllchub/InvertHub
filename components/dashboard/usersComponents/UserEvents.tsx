"use client";

import LoadingSpinner from "@/components/states/LoadingSpinner";
import useGetUserActivity from "@/hooks/events/useGetUserEvents";
import { Events } from "@/types/events";

type propsType = {
  id: string;
};

export default function UserEvents({ id }: propsType) {
  const {
    data: userEvents = [],
    isError,
    isLoading,
  } = useGetUserActivity(id ?? "", {
    enabled: !!id,
  });

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <p>No Events yet.</p>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full dark:bg-slate-800 p-2">
      <div className="max-h-80 overflow-y-auto">
        <ul className="space-y-3">
          {userEvents?.map((a: Events) => (
            <li key={a.id} className="flex items-start gap-3">
              {/* Avatar */}
              <div className="mt-1">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-sm font-semibold">
                  {(a.userName || a.actionType || "S").charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Event Content */}
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-medium">{a.userName ?? "System"}</span>
                  <span className="ml-2 text-gray-600 dark:text-slate-300">
                    {a.description}
                  </span>
                </div>

                <div className="text-xs text-gray-400 mt-1">
                  <span>{new Date(a.logDate).toLocaleString()}</span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">
                    {a.actionType} {a.targetType}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
