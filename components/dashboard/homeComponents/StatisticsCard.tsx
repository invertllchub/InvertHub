
import LoadingSpinner from '@/components/states/LoadingSpinner';
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'



interface ExtraItem {
  label: string;
  value: any;
}

interface Item  {
  label: string;
  value: string | number | undefined;
  href: string;
  extra?: ExtraItem[]
}

interface itemProps {
  item: Item
}


function StatisticsCard({item}: itemProps) {
  const isLoading = item.value === undefined; 
  const isEmpty = item.value === 0 || item.value === null;

  return (
    <Link 
    href={item.href}
    className='w-full h-35 flex flex-col justify-between bg-white  rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 text-(--primary) p-5'>

        <div className='w-full flex justify-between items-start '>
          <h1 className='text-md md:text-lg font-semibold'>{item.label}</h1>
          {isLoading ? (
            <LoadingSpinner />
          ) : isEmpty ? (
            <p className="text-sm text-gray-500 mt-4">No statics</p>
          ) : (
            <p className="text-3xl md:text-5xl font-bold font-mono">{item.value}</p>
          )}
        </div>

                  {/* extra stats */}
          {item.extra && (
            <div className="mt-3 flex flex-col gap-1 text-sm text-gray-600">
              {item.extra.map((ex,i)=>(
                <p key={i} className="flex justify-between">
                  <span>{ex.label}:</span>
                  <span className="font-semibold">{ex.value}</span>
                </p>
              ))}
            </div>
          )}

        {/* button */}
        {/* <Link 
          href={item.href}
          className='w-10 h-10 rounded-full bg-(--primary) text-white flex items-center justify-center'
        >
          <ArrowUpRight size={22}/>
        </Link> */}

    </Link>
  )
}

export default StatisticsCard;