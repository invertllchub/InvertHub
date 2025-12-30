"use client";

import React from "react";
import Image from "next/image";
// types
import { Article, Block } from "@/types/articles";


interface Props {
  article: Article;
}

const ArticlePage: React.FC<Props> = ({ article }) => {
  const blocks = article?.content?.blocks ?? [];

  return (
    <div className="mt-20" id="article-content">

      <div className="relative w-full h-90 md:h-180 mb-14 overflow-hidden rounded-t-3xl">

        {/* Image */}
        <Image
          src={article.coverImageUrl || "/placeholder.jpg"}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight max-w-4xl">
            {article.title}
          </h1>
          {article.subTitle && (
            <p className="text-lg md:text-2xl text-gray-200 mb-6 max-w-3xl">
              {article.subTitle}
            </p>
          )}
        </div>
      </div>

      <div className="text-3xl px-10 leading-relaxed my-6 text-center">
        "{article.seo?.ogDescription}"
      </div>

      <div className="p-6 md:p-16 mt-20">
        <div className="max-w-6xl mx-auto border-t border-gray-400">
          {blocks.map((block: Block, i: number) => {
            switch (block.type) {
      
              case "header":
                return (
                  <h1
                  key={i}
                  className="text-3xl font-bold px-30 py-4"
                  >
                    {block.data.text}
                  </h1>
                );

              case "subheader":
                return (
                  <h2
                    key={i}
                    className="text-2xl font-semibold px-30 leading-relaxed my-6 "
                  >
                    {block.data.text}
                  </h2>
                );

              case "paragraph":
                return (
                  <p
                    key={i}
                    className="text-xl px-30 leading-relaxed my-6 "
                  >
                    {block.data.text}
                  </p>
                );

              case "quote":
                return (
                  <blockquote
                    key={i}
                    className="border-l-4 border-gray-400 pl-6 italic text-xl text-gray-800 font-serif my-8 leading-relaxed"
                  >
                    “{block.data.text}”
                    {block.data.caption && (
                      <footer className="mt-2 text-sm text-gray-500 not-italic">
                        — {block.data.caption}
                      </footer>
                    )}
                  </blockquote>
                );

              case "link":
                return (
                  <a
                    key={i}
                    href={block.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline hover:no-underline font-medium transition-colors duration-200 cursor-pointer block my-4"
                  >
                    {block.data.url || "Visit Link"}
                  </a>
                );

              case "list":
                return block.data.style === "ordered" ? (
                  <ol
                    key={i}
                    className="text-xl list-decimal list-inside px-30 space-y-2 my-6 text-gray-700"
                  >
                    {block.data.items.map((item: any, idx: number) => {
                      const text = typeof item === "string" ? item : item.text || "";
                      return <li key={idx}>{text}</li>;
                    })}
                  </ol>
                ) : (
                  <ul
                    key={i}
                    className="text-xl list-disc list-inside px-30 space-y-2 my-6 text-gray-700"
                  >
                    {block.data.items.map((item: any, idx: number) => {
                      const text = typeof item === "string" ? item : item.content || "";
                      return <li key={idx}>{text}</li>;
                    })}
                  </ul>
                );


              case "image":
                return (
                  <div key={i} className="my-12">
                    <Image
                      src={block.data.file.url}
                      alt={block.data.caption || ""}
                      width={1920}
                      height={1080}
                      className="w-full"
                    />
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
