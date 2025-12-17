"use client";

import { ChangeEvent, useEffect, useState } from "react";

export type ArticleData = {
  title: string;
  subTitle: string;
  author: string;
  coverImageUrl: File | string | null;
  PublicationDate: string;
};

type Props = {
  value: ArticleData;
  onChange: (value: ArticleData) => void;
};

export default function ArticleDataForm({ value, onChange }: Props) {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value.coverImageUrl) {
      setCoverPreview(null);
      return;
    }

    if (value.coverImageUrl instanceof File) {
      const url = URL.createObjectURL(value.coverImageUrl);
      setCoverPreview(url);
      return () => URL.revokeObjectURL(url);
    }

    if (typeof value.coverImageUrl === "string") {
      setCoverPreview(value.coverImageUrl);
    }
  }, [value.coverImageUrl]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value: inputValue } = e.target;
    onChange({ ...value, [name]: inputValue });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1">
          Article Data
        </h2>
        <p className="text-gray-500 text-sm">
          Write your article data here. Use headings, images, and rich content to make it engaging.
        </p>
      </div>

      {/* Cover Image */}
      <div className="mb-6">
        <label
          htmlFor="cover"
          className="flex items-center justify-center w-full h-100 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 transition overflow-hidden bg-gray-50"
        >
          {coverPreview ? (
            <img
              src={coverPreview}
              alt="Cover preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-gray-400 px-4">
              <p className="text-sm font-medium">Click to upload cover image</p>
              <p className="text-xs mt-1">Recommended size: 1200×630</p>
            </div>
          )}
        </label>
        <input
          id="cover"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            onChange({
              ...value,
              coverImageUrl: e.target.files?.[0] || null,
            })
          }
        />
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            name="title"
            value={value.title}
            onChange={handleChange}
            placeholder="Enter the main title of the article"
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Subtitle</label>
          <input
            name="subTitle"
            value={value.subTitle}
            onChange={handleChange}
            placeholder="Enter a short subtitle or summary"
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Author</label>
          <input
            name="author"
            value={value.author}
            onChange={handleChange}
            placeholder="Enter the author name"
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Publication Date</label>
          <input
            type="date"
            name="PublicationDate"
            value={value.PublicationDate}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
          />
        </div>
      </div>
    </div>
  );
}
