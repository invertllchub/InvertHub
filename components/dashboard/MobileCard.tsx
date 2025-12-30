import Link from "next/link";
import React from "react";
import formatDate from "@/utils/FormatDate";

interface Column {
    key: string;
    label: string;
    className?: string;
}

interface MobileCardProps<T> {
    page: string;
    data: T[];
    columns: Column[];
}

const MobileCard = <T extends { id: string, slug?: string  }>({
    page,
    data,
    columns,
}: MobileCardProps<T>) => {
    return (
        <div className="space-y-4">
            {data.map((item) => (
                <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow-sm transition-all duration-150 active:scale-[0.98]"
                >
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
                    >
                        {columns.map((col) => {
                            const value = (item as any)[col.key];

                            return (
                                <p key={col.key} className="text-sm text-gray-600">
                                    <span className="font-medium">{col.label}:</span>{" "}
                                    {col.key === "lastLoginAt" ||
                                    col.key === "createdAt" ||
                                    col.key === "updatedAt" ||
                                    col.key === "closingDate" ||
                                    col.key === "publicationDate" ? (
                                        value ? formatDate(value) : "—"
                                    ) : (
                                        value ?? "—"
                                    )}
                                </p>
                            );
                        })}                        
                    </Link>
                </div>
            ))}

            {data.length === 0 && (
                <div className="text-center text-gray-500 py-10">No data found.</div>
            )}
        </div>
    );
}

export default React.memo(MobileCard);
