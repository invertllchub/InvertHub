"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/dashboard/articlesComponents/Editor"), {
  ssr: false,
});

export default function AddArticlePage() {
  return (
    <div>
      <Editor />
    </div>
  );
}
