import React from "react";
import Link from "next/link";
import formatDate from "@/utils/FormatDate";

interface Column {
  key: string;
  label: string;
  className?: string;
  width?: string;
}

interface TableProps<T> {
  page: string;
  data: T[];
  columns: Column[];
  renderActions?: (item: T) => React.ReactNode;
}

const Table = <T extends { id: number | string, slug?: string }>({
  page,
  data,
  columns,
}: TableProps<T>) => {
const gridColumns = [...(columns.map(col => col.width || "1fr"))].filter(Boolean).join(" ");


  return (
    <div className="w-full overflow-x-auto">
      {/* Header */}
      <div
        className="grid gap-8 p-4 font-semibold text-gray-700"
        style={{ gridTemplateColumns: gridColumns }}
      >
        {columns.map((col) => (
          <div key={col.key}>{col.label}</div>
        ))}
      </div>

      {/* Rows */}
      {data.map((item, index) => {
        const isDisabled = (item as any).isActive === false;
        return (
        <Link
        href={`/dashboard/${page}/${page === "articles" ? item.slug : item.id}/${
          page === "users"
            ? "user-profile"
            : page === "jobs"
            ? "job-details"
            : page === "projects"
            ? "project-details"
            : page === "articles"
            ? "article-details"
            : "edit"
        }`}
          key={item.id}
          className={`grid gap-8 p-4 my-1.5 shadow-sm text-gray-600 bg-white hover:bg-gray-100 
            duration-150 transition-all active:scale-[0.98]
            ${isDisabled ? "opacity-50 cursor-not-allowed grayscale" : "text-gray-600"}
            ${index === 0 ? "rounded-t-lg" : ""}
            ${index === data.length - 1 ? "rounded-b-lg" : ""}`}
          style={{ gridTemplateColumns: gridColumns }}
        >
          {columns.map((col) => {
            const value = (item as any)[col.key];

            return (
              <div 
              key={col.key} className="flex items-center truncate">
                {
                col.key === "lastLoginAt" 
                || col.key === "createdAt" 
                || col.key === "updatedAt" 
                || col.key === "closingDate"
                || col.key === "publicationDate"  
                ? (
                  value ? formatDate(value) : "—"
                ) : col.key === "isActive" ? (
                  value ? (
                    <span 
                    className="text-green-500 text-2xl" 
                    title="Active"
                    >
                      ●
                    </span>
                  ) : (
                    <span 
                    className="text-red-500 text-2xl"
                    title="Disabled"
                    >
                      ●
                    </span>
                  )
                ) : (
                  value
                )}
              </div>
            );
          })}
        </Link>
      )})}

      {data.length === 0 && (
        <div className="text-center text-gray-500 py-10">No data found.</div>
      )}
    </div>
  );
};

export default React.memo(Table) as typeof Table;