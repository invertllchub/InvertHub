"use client";

// Components
import LastEvents from "@/components/dashboard/homeComponents/LastEvents";
import StatisticsCard from "@/components/dashboard/homeComponents/StatisticsCard";
import HomePageToolbar from "@/components/dashboard/homeComponents/HomePageToolbar";
import VisitorsChart from "@/components/dashboard/homeComponents/VisitorsChart";
// React Query & Hooks
import useGetStatistics from "@/hooks/statistics/useGetStatics";
// Types
import { DashboardStatistics } from "@/types/statistics";


function page() {
  const { data } = useGetStatistics();
  const statistics = (data?.data?.data ?? {}) as Partial<DashboardStatistics>;
  console.log(statistics);

  const staticsList = [
  {
    label: "Projects",
    value: statistics.projectsCount,
    href: "/dashboard/projects",
  },
  {
    label: "Articles",
    value: statistics.articlesCount,
    href: "/dashboard/articles",
    extra: [
      { label: "Published this month", value: statistics.publishedArticlesThisMonth }
    ]
  },
  {
    label: "Jobs",
    value: statistics.jobsCount,
    href: "/dashboard/jobs",
    extra: [
      { label: "Open", value: statistics.openJobsCount },
      { label: "Closed", value: statistics.closedJobsCount },
    ]
  },
  {
    label: "Team",
    value: statistics.usersCount,
    href: "/dashboard/users",
    extra: [
      { label: "Active Now", value: statistics.activeUsersCount },
    ]
  },
  ];


  return (
    <div className="pt-22 md:pt-6 md:ml-50 p-6 md:p-12 min-h-screen bg-(--secondary) flex flex-col gap-8">
      <HomePageToolbar />

      <div className="w-full flex-1">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {staticsList.map((item, i) => {
              return <StatisticsCard key={i} item={item} />;
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className=" bg-white rounded-lg shadow-md p-4">
            <VisitorsChart />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h1 className="font-semibold">Last Events</h1>
            <div className="overflow-y-auto ">
              <LastEvents />
            </div>
          </div>
        </div>
      </div>
  );
}

export default page;
