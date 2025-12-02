"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
// Components
const ToolBar = dynamic(() => import("@/components/dashboard/ToolBar"));
const MobileCard = dynamic(() => import("@/components/dashboard/MobileCard"));
const Table = dynamic(() => import("@/components/dashboard/Table"), {
  ssr: false,
}) as typeof import("@/components/dashboard/Table").default;
// React Query
import useGetArticles from "@/hooks/articles/useGetArticles";
// Types
import { Article } from "@/types/articles";
import formatDate from "@/utils/FormatDate";

function Page() {
  const { data: articles = [] } = useGetArticles();
  const [searchValue, setSearchValue] = useState("");


  const filteredArticles = useMemo(() => {
    if (!articles.length) return [];
    const search = searchValue.toLowerCase();

    return articles
      .map((article) => {
        const titleBlock = article.blocks.find((b) => b.type === "header");
        const title = titleBlock?.data.text || "Untitled";
        const date = formatDate(String(article.time));

        return {
          ...article,
          title,
          date,
        };
      })
      .filter((article) => {
        if (!searchValue) return true;
        const author = article.author?.toLowerCase() || "";
        return (
          article.title.toLowerCase().includes(search) ||
          author.includes(search) ||
          article.date.toLowerCase().includes(search)
        );
      });
  }, [articles, searchValue]);

  const columns = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author", width: "200px" },
    { key: "date", label: "Date", width: "200px" },
  ];

  return (
    <div className="pt-22 md:pt-12 md:ml-50 p-6 md:p-12 min-h-screen bg-[#D6F4ED] overflow-hidden">
      <ToolBar title="articles" setSearchValue={setSearchValue} />

      {/* TABLE VIEW (Desktop) */}
      <div className="hidden md:block w-full mt-8 overflow-x-auto">
        <Table<Article & { title: string; date: string }>
          page="articles"
          data={filteredArticles}
          columns={columns}
        />
      </div>

      {/* CARD VIEW (Mobile) */}
      <div className="block md:hidden mt-6  space-y-4">
        <MobileCard
          page="articles"
          columns={columns}
          data={filteredArticles}
        />
      </div>
    </div>
  );
}

export default Page;
