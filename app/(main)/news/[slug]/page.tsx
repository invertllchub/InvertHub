"use client";

import { useParams } from "next/navigation";
// Components
import ArticlePage from "@/components/main/NewsPage/ArticlePage";
// React Query
import useGetArticle from "@/hooks/articles/useGetArticle";
// Loading & Error States
import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";

function Page() {
  const params = useParams();
  const articleSlug = params.slug as string;
  
  const {data: article, isLoading, isError} = useGetArticle(articleSlug, {
    enabled: articleSlug !== "",  
  });

  if (isError) {
    return (
      <div className="ml-50 flex justify-center items-center h-screen">
        <ErrorState />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="ml-50 flex justify-center items-center h-screen">
        <IsLoadingState />
      </div>
    );
  }

  return (
    <>
      {article && (
        <>
          <ArticlePage article={article} />
        </>
      )}
    </>
  );
}

export default Page;
