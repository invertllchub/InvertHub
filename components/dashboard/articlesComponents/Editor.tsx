"use client";

import "../../../app/(main)/globals.css";
import { useEffect, useRef, useState } from "react";
// Editor.js & Editor tools
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
// Toast
import { showToast } from "@/components/toast/Toast";
// Components
import GoBackBtn from "../Buttons/GoBackBtn";
import PublishBtn from "../Buttons/PublishBtn";
// React Query Hook
import useAddArticle from "@/hooks/articles/useAddArticle";
// Components
import ArticleDataForm, {ArticleData} from "./ArticleDataForm";
import ArticleMetaForm, {ArticleSEO} from "./ArticleMetaForm";
// Functions
import { uploadToCloudinary } from "@/utils/CloudinaryUpload";
import { toSlug } from "@/utils/ToSlug";

export default function Editor() {
  const { mutate } = useAddArticle();
  const editorRef = useRef<EditorJS | null>(null);

  const [data, setData] = useState<ArticleData>({
    title: "",
    subTitle: "",
    coverImageUrl: null,
    author: "",
    PublicationDate: "",
  });

  const [seo, setSeo] = useState<ArticleSEO>({
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImageUrl: null,
  });

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: List,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const url = await uploadToCloudinary(file);
                  return {
                    success: 1,
                    file: { url },
                  };
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);


  const handleSave = async () => {
    const outputData = await editorRef.current?.save();

    try {
      if (!outputData?.blocks?.length) {
        showToast("error", { message: "Article content is empty" });
        return;
      }

      if (!outputData?.blocks?.length) {
        showToast("error", { message: "Article content is empty" });
        return;
      }
  
      const toastId = showToast("loading", {
        message: "Publishing Article...",
      });

      const coverUrl = data.coverImageUrl instanceof File
        ? await uploadToCloudinary(data.coverImageUrl)
        : data.coverImageUrl || "";

      const ogUrl = seo.ogImageUrl instanceof File
      ? await uploadToCloudinary(seo.ogImageUrl)
      : seo.ogImageUrl || "";

      const payload = { 
        title: data.title || "",
        subTitle: data.subTitle || "",
        slug: toSlug(data.title) || "",
        author: data.author || "",
        coverImageUrl: coverUrl || "",
        publicationDate: data.PublicationDate || "",
        content: {
          time: outputData.time || "",
          blocks: outputData.blocks || [],
          version: outputData.version || "",
        },
        seo: {
          metaTitle: seo.metaTitle || "",
          metaDescription: seo.metaDescription || "",
          metaKeywords: seo.metaKeywords || "",
          ogTitle: seo.ogTitle || "",
          ogDescription: seo.ogDescription || "",
          ogImageUrl: ogUrl || "",
        },
      };

      mutate(payload, {
        onSuccess: () => {
          showToast("success", {
            message: "Article created successfully!",
            toastId,
          });
        },
        onError: (err: any) => {
          showToast("error", {
            message: err.message || "Failed to submit Article",
            toastId,
          });
        },
      });

    } catch (error) {
      showToast("error", {
        message: "Something went wrong while publishing",
      });
    }
  };


  return (
    <div className='pt-22 md:pt-12 md:ml-50 p-6 md:p-14 min-h-screen bg-(--secondary) overflow-hidden'>

      <div className="w-full bg-white flex flex-col md:flex-row items-center justify-between gap-6 p-6 
          rounded-t-lg shadow-md border-b border-gray-500">
        <div className='flex items-center justify-center gap-8'>
          <GoBackBtn />
          <div className='text-gray-500'>articles list / Create article</div>
        </div>
        <div className='hidden md:block'>
          <PublishBtn text="Publlish Now" onClick={handleSave}/>
        </div>
      </div>

      <div className="bg-white mb-10 p-2 md:p-8 rounded-b-lg flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-6 pr-6 md:border-r md:border-gray-300">
          <ArticleDataForm value={data} onChange={setData} />
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <ArticleMetaForm value={seo} onChange={setSeo} />
        </div>
      </div>

      <div className="bg-white p-2 md:p-8 rounded-lg min-h-[60vh]">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1">Article Content</h2>
          <p className="text-gray-500 text-sm">
            Write your article here. Use headings, images, and rich content to make it engaging.
          </p>
        </div>

        <div className="border border-gray-400 h-[105vh] rounded-lg overflow-hidden">
          <div id="editorjs" className="h-full overflow-y-auto p-4"/>
        </div>
      </div>

      <div className='md:hidden w-full flex items-center justify-center mt-10'>
        <PublishBtn text="Publlish Now" onClick={handleSave}/>
      </div>
    </div>
  );
}
