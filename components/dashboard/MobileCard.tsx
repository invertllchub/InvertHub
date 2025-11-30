import Link from "next/link";
import React from "react";

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

const MobileCard = <T extends { id: string }>({
    page,
    data,
    columns,
}: MobileCardProps<T>) => {
    return (
        <div className="space-y-4">
            {data.map((item) => (
                <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow-sm border transition-all duration-150 active:scale-[0.98]"
                >
                    <Link
                    href={`/dashboard/${page}/${item.id}/edit`}
                    >
                        {columns.map((col) => (
                            <p key={col.key} className='text-sm text-gray-600'>
                                <span className="font-medium">{col.label}:</span> {(item as any)[col.key]}
                            </p>
                        ))}
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
