import { Pencil } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type EditBrnProp = {
    page: string;
    id: string;
    details: string
}
function EditBtn({page, id, details}: EditBrnProp) {
    return (
        <Link
        title='Edit job details'
        href={`/dashboard/${page}/${id}/${details}/edit`}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium
         bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition shadow-sm"
        >
            <Pencil size={20} className=" text-gray-500 cursor-pointer" />
        </Link>
  )
}

export default EditBtn
