"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import ToolBar from "@/components/dashboard/ToolBar";
import DeleteBtn from "@/components/dashboard/DeleteBtn";
import UpdateBtn from "@/components/dashboard/UpdateBtn";
import { Article } from "@/types/articles";
import { useSelection } from "@/hooks/useSelection";



function Page() {
  const [ articles, setArticles] = useState<Article []>([])
  const [searchValue, setSearchValue] = useState("");

  const {
    selected,
    toggleAll,
    toggleOne,
    handleDeleteOne,
    handleDeleteAll,
    allSelected,
    someSelected,
    headerCheckboxRef,
  } = useSelection(articles);


  const fetchData = async () => {
    const respone = await fetch('/articles.json')
    const result = await respone.json()
    setArticles(result)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const filteredArticles = articles.filter((article) => {
    if (!searchValue) return true;
    const search = searchValue.toLowerCase();
    const titleBlock = article.blocks.find((b) => b.type === "header");

    const title = titleBlock?.data.text.toLowerCase() || "";
    const author = article.author?.toLowerCase() || "";
    const date = formatDate(article.time).toLowerCase();

    return title.includes(search) || author.includes(search) || date.includes(search);
  });



  return (
    <div className='pt-22 md:pt-12 md:ml-50 p-6 md:p-12 min-h-screen bg-[#D6F4ED] overflow-hidden'>
      <ToolBar
      title="articles"
      allSelected={allSelected}
      someSelected={someSelected}
      setSearchValue={setSearchValue}
      >
        <DeleteBtn selectedIds={selected} onDeleted={handleDeleteAll} page={'articles'}/>
      </ToolBar>

      {/* 🖥️ TABLE VIEW */}
      <div className="hidden md:block w-full mt-8 overflow-x-auto">
        <div className="grid grid-cols-[50px_1fr_200px_200px_200px] gap-8 my-4 font-semibold text-gray-700 pb-2">
          <div className="flex justify-center">
            <input
              type="checkbox"
              ref={headerCheckboxRef}
              checked={allSelected}
              onChange={toggleAll}
              className="w-4 h-4 cursor-pointer accent-blue-700"
            />
          </div>
          <div>Title</div>
          <div>Author</div>
          <div>Date</div>
          <div className="text-center">Actions</div>
        </div>

        {filteredArticles.map((article, index) => {
          const titleBlock = article.blocks.find((b) => b.type === "header");
          const title = titleBlock?.data.text || "Untitled";
          const date = formatDate(article.time);
          return (
            <div
            key={article.id}
            className={`grid grid-cols-[50px_1fr_200px_200px_200px] gap-8 py-4 my-1.5 shadow-sm text-gray-600 hover:bg-gray-50 transition-all duration-150 
              ${selected.includes(article.id) ? "bg-blue-50" : "bg-white"}
              ${index === 0 ? "rounded-t-lg" : ""}
              ${index === filteredArticles.length - 1 ? "rounded-b-lg" : ""}
              `}
            >
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={selected.includes(index)}
                  onChange={() => toggleOne(index)}
                  className="w-4 h-4 cursor-pointer accent-blue-700"
                />
              </div>
              <div className="flex items-center font-medium">{title}</div>
              <div className="flex items-center">{article.author || "N/A"}</div>
              <div className="flex items-center">{date}</div>
              <div className="flex justify-center gap-4">
                <DeleteBtn page={'articles'} id={article.id} onDeleted={() => handleDeleteOne(article.id)} />
                <UpdateBtn page="articles" id={article.id} />
              </div>
            </div>
          );
        })}

        {filteredArticles.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No articles found.
          </div>
        )}
      </div>

      {/* 📱 CARD VIEW */}
      <div className="block md:hidden mt-6 space-y-4">
        {filteredArticles.map((article, i) => {
          const titleBlock = article.blocks.find((b) => b.type === "header");
          const title = titleBlock?.data.text || "Untitled";
          const date = formatDate(article.time);

          return (
            <div
              key={i}
              className={`relative bg-white p-5 rounded-xl shadow-sm border transition-all duration-200 ${
                selected.includes(i) ? "border-blue-500" : "border-gray-200"
              }`}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selected.includes(i)}
                onChange={() => toggleOne(i)}
                className="absolute top-4 left-4 w-4 h-4 accent-blue-700 cursor-pointer"
              />

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 pl-6 mb-1">
                {title}
              </h3>

              {/* Author + Date */}
              <p className="text-sm text-gray-500 pl-6 mb-3">
                {article.author || "N/A"} • {date}
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <DeleteBtn page={'articles'} id={article.id} onDeleted={() => handleDeleteOne(article.id)} />
                <UpdateBtn page="articles" id={article.id} />
              </div>
            </div>
          );
        })}

        {filteredArticles.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No articles found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
