"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
// types
import { Article, Block } from "@/types/articles";
import DownloadArticleButton from "./DownloadArticleButton";

interface Props {
  article: Article;
}

const ArticlePage: React.FC<Props> = ({ article }) => {
  return (
    <div className="p-6 md:p-16 mt-20" id="article-content">
      <div className="w-full flex justify-between">
        <time className="text-sm text-gray-500 mb-3 block">
          {new Date(article.time).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <DownloadArticleButton blocks={article.blocks} fileName={`${article.blocks[0].data.text}.pdf`} />
      </div>

      {article.blocks.map((block: Block, i: number) => {
        switch (block.type) {
          case "header":
            return React.createElement(
              `h${block.data.level || 2}`,
              {
                key: i,
                className:
                  "text-3xl md:text-5xl font-bold mt-10 mb-3 text-gray-800",
              },
              block.data.text
            );

          case "overview":
            return (
              <p
                key={i}
                className="text-md md:text-3xl font-bold my-2 text-gray-800"
              >
                {block.data.text}
              </p>
            );

          case "paragraph":
            return (
              <p
                key={i}
                className="text-xl md:text-xl font-bold my-5 text-gray-600"
              >
                {block.data.text}
              </p>
            );

          case "list":
            return block.data.style === "ordered" ? (
              <ol
                key={i}
                className="list-decimal list-inside pl-6 space-y-2 my-6 text-gray-700"
              >
                {block.data.items.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul
                key={i}
                className="list-disc list-inside pl-6 space-y-2 my-6 text-gray-700"
              >
                {block.data.items.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            );

          case "image":
            return (
              <div key={i} className="my-12">
                <div className="relative w-full">
                  <Image
                    src={block.data.file.url}
                    alt={block.data.caption || ""}
                    width={1920}
                    height={1080}
                    priority
                    className="w-full h-auto rounded-lg object-contain"
                  />
                </div>
              </div>
            );

          case "video":
            return (
              <div key={i} className="my-12">
                <div className="relative w-full">
                  <video
                    src={block.data.url}
                    controls
                    muted
                    autoPlay
                    width={1920}
                    height={1080}
                    className="w-full h-auto rounded-lg object-contain"
                  />
                </div>
              </div>
            );

          case "link":
            if (!block.data?.url) return null;
            return (
              <p key={i}>
                <Link
                  href={block.data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {block.data.url}
                </Link>
              </p>
            );

          case "embed":
            return (
              <div key={i} className="relative w-full my-20">
                <iframe
                  src={block.data.embed}
                  width={block.data.width}
                  height={block.data.height}
                  allow="autoplay"
                  className="w-full h-[300px] md:h-screen  rounded-lg object-contain"
                ></iframe>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default ArticlePage;
