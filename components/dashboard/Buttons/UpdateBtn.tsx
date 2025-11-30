import React from 'react'
import { SquarePen } from 'lucide-react';
import Link from 'next/link';


type UpdateBtnProps = {
  page: string
  id: number | string
}

function UpdateBtn({ id, page }: UpdateBtnProps) {
  return (
    <Link href={`/dashboard/${page}/${id}/edit`}>
      <div 
        title="update" 
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-full"
      >
        <SquarePen size={20} />
      </div>
    </Link>
  )
}

export default React.memo(UpdateBtn);
