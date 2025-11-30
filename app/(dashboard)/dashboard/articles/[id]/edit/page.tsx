"use client"

import dynamic from "next/dynamic";

const EditArticlePage = dynamic(() => import("@/components/dashboard/articlesComponents/EditArticlePage"), {
  ssr: false,
});


function page() {
  return (
    <div >
      <EditArticlePage />
    </div>
  )
}

export default page
