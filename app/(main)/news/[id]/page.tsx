"use client";

import { useParams } from "next/navigation";
import ArticlePage from "@/components/main/NewsPage/ArticlePage";
// React Query
import useGetArticles from "@/hooks/articles/useGetArticles";

function Page() {
  const { data: articles = [], isLoading, error } = useGetArticles();
  const params = useParams();
  const articleId = (params.id);
  const article = articles.find((p) => p.id === articleId);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold animate-pulse">
          Loading Articles...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl text-red-500 font-semibold">
          Failed to load Articles 😞
        </p>
      </div>
    );
  }

  return (
    <>
      {article ? (
        <ArticlePage article={article} />
      ) : (
        <p className="text-center text-lg font-medium mt-10">
          Article Not Found...
        </p>
      )}
    </>
  );
}

export default Page;
