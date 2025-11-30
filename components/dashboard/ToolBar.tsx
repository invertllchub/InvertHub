

import React from 'react'
import dynamic from 'next/dynamic';
// Icons
import { Search } from 'lucide-react'
// Components
const AddBtn = dynamic(() => import("./Buttons/AddBtn"), {
  ssr: false, 
});

type ToolBarProps = {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  title: string;  
};

function ToolBar({ setSearchValue, title}: ToolBarProps) {



  return (
    <div className='w-full bg-white flex flex-col md:flex-row items-center justify-between gap-6 p-4 rounded-lg shadow-md'>

      <div className='w-full flex justify-between'>
        <h1 className='text-2xl md:text-4xl font-extrabold text-(--primary)'>
          {title.toUpperCase()} LIST
        </h1>
      </div>

      <div className='w-full md:w-6/12 flex items-center justify-end gap-6'>

        <div className='w-full md:w-6/12 relative bg-white rounded-lg'>
          <input
            type="text"
            placeholder='Search'
            className="w-full px-10 py-3.5 md:py-3 outline-none border border-(--secondary) rounded-lg"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className='absolute top-1/2 -translate-y-1/2 left-2'>
            <Search size={20} />
          </div>
        </div>

        <AddBtn title={title}/>
        
      </div>

    </div>
  )
}

export default React.memo(ToolBar);
