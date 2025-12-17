"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
// Functions
import formatDate from "@/utils/FormatDate";
// Loading & Error States
import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";
// Buttons & Components
import EditBtn from "@/components/dashboard/Buttons/EditBtn";
import DeleteBtn from "@/components/dashboard/Buttons/DeleteBtn";
// Cokkies
import Cookies from "js-cookie";
// React Query & Hooks
import useGetArticle from "@/hooks/articles/useGetArticle";
import useDeleteArticle from "@/hooks/articles/useDeleteArticle";

function ArticleDetailsPage() {
  const defaultCover = "https://res.cloudinary.com/dyfregti9/image/upload/v1764634158/default-ui-image-placeholder-wireframes-600nw-1037719192_hbb5qj.webp";
  const role = Cookies.get("role");
  const { mutate } = useDeleteArticle();
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
    <div className="bg-(--secondary) p-4 pt-20 md:p-14 ml-0 md:ml-50 min-h-screen md:h-screen">
      <div className="bg-white rounded-3xl shadow-lg p-6 h-full flex flex-col gap-8">

        {/* -------- Header -------- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">

          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-gray-800">
              {article?.title}
            </h1>
            {article?.subTitle && (
              <p className="text-lg text-gray-500 mt-1">
                {article.subTitle}
              </p>
            )}
          </div>

          {/* Edit / Delete Buttons */}
          <div className="flex items-center gap-4">
            {article && (
              <EditBtn 
                page="articles"
                id={article.slug}
                details="article-details"
              />
            )}
            {role === "Admin" && article && (
              <DeleteBtn 
                item="Article"
                id={article.id}
                deleteFn={mutate}
              />
            )}
          </div>
        </div>

        {/* -------- Cover -------- */}
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
          <Image
            src={article?.coverImageUrl || defaultCover}
            alt={article?.title || ""}
            fill
            className="object-cover"
          />
        </div>

        {/* -------- Description -------- */}
        <p className="text-gray-700 text-xl leading-relaxed text-center max-w-3xl mx-auto">
          {article?.seo?.metaDescription || "—"}
        </p>

        {/* -------- Footer / Info Grid -------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
          <InfoItem
            label="Author"
            value={article?.author}
          />
          <InfoItem
            label="publicationDate"
            value={
              article?.publicationDate
                ? formatDate(article.publicationDate)
                : "—"
            }
          />
          <InfoItem
            label="Slug"
            value={article?.slug}
          />
          <InfoItem
            label="Article ID"
            value={article?.id}
          />
        </div>
      </div>
    </div>
  );
}

export default ArticleDetailsPage;


function InfoItem({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="flex justify-between bg-gray-50 p-3 rounded-xl">
      <span className="font-medium">{label}</span>
      <span className="truncate max-w-[60%]">
        {value || "—"}
      </span>
    </div>
  );
}
