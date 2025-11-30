import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { string } from 'zod'

interface Item  {
    label: string,
    value: string,
    href: string
}
interface itemProps {
    item: Item
}

function StaticCard({item}: itemProps) {
  return (
              <div 
              className='bg-white h-35 rounded-lg shadow-md text-(--primary) p-5'
              >
                <div className='w-full h-full flex justify-between gap-4'>
                  <div className='h-full flex flex-col justify-between'>
                    <h1 className='text-md md:text-lg font-semibold'>Total {item.label}</h1>
                    <p className='text-3xl md:text-6xl font-bold mt-4 font-mono'>{item.value}</p>
                  </div>
                  <Link 
                  href={item.href}
                  className='w-9 h-9 rounded-full bg-(--primary) text-white flex items-center justify-center'
                  >
                    <ArrowUpRight  size={25}/>
                  </Link>
                </div>
        </div>
  )
}

export default StaticCard
