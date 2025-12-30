// Components
import LoadingSpinner from "@/components/states/LoadingSpinner";
// React Query & Hooks
import useGetActivities from "@/hooks/events/useGetLastEvents";

export default function LastEvents() {
  const { data, isLoading } = useGetActivities();

  const activities = data?.data?.data?.recentActivity ?? [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full dark:bg-slate-800 p-4">
      <div className="max-h-80">
        <ul className="space-y-3">
          {activities.length === 0 && (
            <li className="text-sm text-gray-500">No event yet.</li>
          )}

          {activities.map((a: any, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-sm">
                  {(a.userName || a.actionType || "S").charAt(0).toUpperCase()}
                </div>
              </div>

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
