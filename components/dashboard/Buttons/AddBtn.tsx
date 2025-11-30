"use client"

import React from 'react';
import Link from 'next/link'

function AddBtn({title}: {title: string}) {
  return (
        <Link
          href={`/dashboard/${title.toLowerCase()}/add`}
          className="block px-1 md:px-6 py-1 md:py-3 rounded-lg bg-(--primary) hover:bg-(--tertiary) text-white cursor-pointer text-center"
        >
          + Add <span>{title}</span>
        </Link>
  )
}

export default React.memo(AddBtn);
