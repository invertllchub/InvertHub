"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/dashboard/articlesComponents/Editor"), {
  ssr: false,
});

export default function AddArticlePage() {
  return (
    <div className="pl-0 md:pl-15">
      <Editor />
    </div>
  );
}
