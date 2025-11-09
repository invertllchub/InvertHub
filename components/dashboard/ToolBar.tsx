import React from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link';

type ToolBarProps = {
  allSelected: boolean;
  someSelected: boolean;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  children?: React.ReactNode;   
};

function ToolBar({ allSelected, someSelected, setSearchValue, title, children }: ToolBarProps) {
  return (
    <div className='w-full bg-white flex flex-col md:flex-row items-center justify-between gap-6 p-4 rounded-lg shadow-md'>

      <div className='w-full flex justify-between'>
        <h1 className='text-2xl md:text-4xl font-extrabold text-[#473472]'>
          {title.toUpperCase()} LIST
        </h1>
        <div className={`${allSelected || someSelected ? "visible" : "invisible"}`}>
          {children}
        </div>
      </div>

      <div className='w-full md:w-6/12 flex items-center justify-end gap-6'>

        <div className='w-full md:w-6/12 relative bg-white rounded-lg'>
          <input
            type="text"
            placeholder='Search'
            className="w-full px-10 py-3.5 md:py-3 outline-none border border-[#D6F4ED] rounded-lg"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className='absolute top-1/2 -translate-y-1/2 left-2'>
            <Search size={20} />
          </div>
        </div>

        <Link
          href={`/dashboard/${title.toLowerCase()}/add`}
          className="block px-1 md:px-6 py-1 md:py-3 rounded-lg bg-[#473472] hover:bg-[#53629E] text-white cursor-pointer text-center"
        >
          + Add <span>{title}</span>
        </Link>
        
      </div>

    </div>
  )
}

export default ToolBar
