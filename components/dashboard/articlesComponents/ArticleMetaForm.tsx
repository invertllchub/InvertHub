"use client";

import { ChangeEvent, useEffect, useState } from "react";

export type ArticleSEO = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: File | string | null;  
};

type Props = {
  value: ArticleSEO;
  onChange: (value: ArticleSEO) => void;
};

export default function ArticleSEOForm({ value, onChange }: Props) {
  const [ogPreview, setOgPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value.ogImageUrl) {
      setOgPreview(null);
      return;
    }

    if (typeof value.ogImageUrl === "string") {
      setOgPreview(value.ogImageUrl);
    } else {
      const url = URL.createObjectURL(value.ogImageUrl);
      setOgPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value.ogImageUrl]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value: inputValue } = e.target;
    onChange({ ...value, [name]: inputValue });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1">
          SEO Settings
        </h2>
        <p className="text-gray-500 text-sm">
          Optimize how your article appears in search engines and social media.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Meta Fields */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Meta Title</label>
            <input
              name="metaTitle"
              value={value.metaTitle}
              onChange={handleChange}
              placeholder="Recommended: 50–60 characters"
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Meta Description</label>
            <textarea
              name="metaDescription"
              value={value.metaDescription}
              onChange={handleChange}
              rows={3}
              placeholder="Recommended: 150–160 characters"
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Keywords</label>
            <input
              name="metaKeywords"
              value={value.metaKeywords}
              onChange={handleChange}
              placeholder="pizza, italian food, margherita"
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* Open Graph */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Preview (Open Graph)</h3>

          <div>
            <label className="block text-gray-700 font-medium mb-2">OG Title</label>
            <input
              name="ogTitle"
              value={value.ogTitle}
              onChange={handleChange}
              placeholder="Title for social sharing"
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">OG Description</label>
            <textarea
              name="ogDescription"
              value={value.ogDescription}
              onChange={handleChange}
              rows={3}
              placeholder="Description for Facebook, Twitter, etc."
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="ogImage"
              className="
                flex items-center justify-center
                w-full h-48 border-2 border-dashed border-gray-300
                rounded-xl cursor-pointer hover:border-indigo-500 transition
                overflow-hidden bg-gray-50
              "
            >
              {ogPreview ? (
                <img
                  src={ogPreview}
                  alt="OG Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400 px-4">
                  <p className="text-sm font-medium">Upload Open Graph Image</p>
                  <p className="text-xs mt-1">Recommended: 1200×630</p>
                </div>
              )}
            </label>

            <input
              id="ogImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                onChange({
                  ...value,
                  ogImageUrl: e.target.files?.[0] || null,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
