"use client"

import RecentActivity from '@/components/dashboard/homeComponents/RecentActivity';
import StaticCard from '@/components/dashboard/homeComponents/StaticCard';
import Toolbar from '@/components/dashboard/homeComponents/Toolbar';
import VisitorsChart from '@/components/dashboard/homeComponents/VisitorsChart';
import useGetActivities from '@/hooks/useGetActivities';


function page() {
  const {data: activities =[]} = useGetActivities();
  
  const statics = [
  {label : "Projects", value: "15", href: "/dashboard/projects"},
  {label : "Articles", value: "25", href: "/dashboard/articles"},
  {label : "Jobs", value: "9", href: "/dashboard/jobs"},
  {label : "Users", value: "6", href: "/dashboard/users"},
  ]
  return (
    <div className="pt-22 md:pt-6 md:ml-50 p-6 md:p-12 min-h-screen bg-(--secondary) flex flex-col gap-8">
      <Toolbar />
      <div className='w-full flex-1'>
        <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12'>
          {statics.map((item, i) => {
            return (
              <StaticCard key={i} item={item}/>
            )
          })}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-12'>
          <div className=' bg-white rounded-lg shadow-md p-4'>
            <VisitorsChart />
          </div>
          <div className='bg-white rounded-lg shadow-md p-4'>
            <h1 className='font-semibold'>Last Events</h1>
            <div className='overflow-y-auto '>
              <RecentActivity activities={activities}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
