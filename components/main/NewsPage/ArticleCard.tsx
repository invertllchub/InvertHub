import Image from "next/image";
import Link from "next/link";
// types
import { Article } from "@/types/articles";
import formatDate from "@/utils/FormatDate";

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {

  const header = article.title || "Not Title"

  const image = article.coverImageUrl || "";

  const subTitle = article.subTitle || 'No Sub Title'



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
          {formatDate(article.publicationDate)}
        </time>

        <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-gray-700 transition-colors">
          {header}
        </h2>

        <p className="text-gray-600 mb-3 line-clamp-3 font-light">
          {subTitle}
        </p>

        <Link
          href={`/news/${article.slug}`}
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
