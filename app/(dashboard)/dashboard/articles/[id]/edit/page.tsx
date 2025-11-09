"use client"

import dynamic from "next/dynamic";

const EditArticlePage = dynamic(() => import("@/components/dashboard/articlesComponents/EditArticlePage"), {
  ssr: false,
});
import React from 'react'

function page() {
  return (
    <div className='pl-0 md:pl-15'>
      <EditArticlePage />
    </div>
  )
}

export default page
