"use client";

import Link from "next/link";

export default function NotAuthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-md rounded-xl p-12 text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">🚫</h1>
        <h2 className="text-2xl font-semibold mb-2">Not Authorized</h2>
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
