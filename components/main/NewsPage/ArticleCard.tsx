import Image from "next/image";
import Link from "next/link";
// types
import { Article } from "@/types/articles";

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {

  const blocks = Array.isArray(article.blocks) ? article.blocks : [];

  const headerBlock = blocks.find((b) => b.type === "header");
  const header = headerBlock?.data?.text || "No title";

  const imageBlock = blocks.find((b) => b.type === "image");
  const image = imageBlock?.data?.file?.url;

  const overviewBlock = blocks.find((b) => b.type === "overview");
  const paragraph = overviewBlock?.data?.text || "";



  return (
    <article className="group min-h-[300px] bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-300">
      {image && (
        <div className="relative h-60 overflow-hidden">
          <Image
            src={image}
            alt={header}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        <time className="text-sm text-gray-500 mb-3 block">
          {new Date(article.time).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>

        <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-gray-700 transition-colors">
          {header}
        </h2>

        <p className="text-gray-600 mb-3 line-clamp-3 font-light">
          {paragraph}
        </p>

        <Link
          href={`/news/${article.id}`}
          className="font-medium text-gray-900 hover:text-gray-700 transition-colors flex items-center gap-1 mt-4"
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
