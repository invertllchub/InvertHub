// React Query
import useGetActivities from "@/hooks/useGetActivities";

export default function RecentActivity() {
    const {data: activities = []} = useGetActivities();


    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Last Events</h3>
            <div className="max-h-80 overflow-y-auto">
                <ul className="space-y-3">
                    {activities.length === 0 && <li className="text-sm text-gray-500">No event yet.</li>}
                    {activities.map((a: any) => (
                        <li key={a.id} className="flex items-start gap-3">
                            <div className="mt-1">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-sm">
                                    {(a.user || a.action || "S").charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-sm">
                                    <span className="font-medium">{a.user ?? "System"}</span>
                                    <span className="ml-2 text-gray-600 dark:text-slate-300"> {a.message}</span>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    <span>{new Date(a.createdAt).toLocaleString()}</span>
                                    <span className="mx-2">•</span>
                                    <span className="capitalize">{a.action} {a.entity}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
