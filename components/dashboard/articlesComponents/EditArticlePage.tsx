"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
// Editor.js & Editor tools
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import LinkTool from "@/utils/editorTools/LinkTool";
import VideoTool from "@/utils/editorTools/VideoTool";
import OverviewTool from "@/utils/editorTools/OverViewTool";
// Toast 
import { showToast } from "@/components/jobs/Toast";
// supabase
import { supabase } from "@/lib/supabaseClient"; 
// React Query
import useGetArticles from "@/hooks/useGetArticles";

export default function EditArticlePage() {
  const editorRef = useRef<EditorJS | null>(null);
  const { data: articles = [], isLoading, error} = useGetArticles()
  const params = useParams();
  const articleId = Number(params.id); 
  const article = articles.find((p) => (p.id) === articleId);


  
  
  useEffect(() => {
    if (!article || editorRef.current) return;
    let editor: EditorJS;

    const initEditor = async () => {
      editor = new EditorJS({
        holder: "editorjs",
        data: article,
        autofocus: true,
        tools: {
          header: Header,
          list: List,
          image: ImageTool,
          embed: Embed,
          link: LinkTool,
          video: VideoTool,
          overview: OverviewTool
        },
      });
      editorRef.current = editor;
    };

    if (article && !editorRef.current) {
      initEditor();
    }

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === "function") {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [article]);

  const handleSave = async () => {
    const outputData = await editorRef.current?.save();
    const toastId = showToast("loading", {
      message: "Updating article..."
    })
    
    const UpdatedArticle = {     
      ...outputData,
      author: "Mohamed", 
    };
    
    try {
      const { data, error } = await supabase
      .from("articles")
      .update(UpdatedArticle)
      .eq("id", articleId);

      console.log(article)


      if (error) {
        console.error("❌ Supabase error:", error);
        showToast("error", {
          message: `Failed to publish: ${error.message}`,
          toastId,
        });
        return;
      }

      showToast("success", {
        message: "Article Published successfully!",
        toastId,
      });
      console.log("✅ Saved article:", data);
    } catch (error) {
      console.error("⚠️ Unexpected error", error);
      showToast("error", {
        message: "Something went wrong, please try again.",
        toastId,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold animate-pulse">Loading Articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl text-red-500 font-semibold">Failed to load Articles 😞</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-200/75 p-6 md:p-12">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl md:text-4xl font-extrabold text-gray-800">
          EDIT YOUR ARTICLE
        </h1>
        <button
          onClick={handleSave}
          className="px-4 w-42 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg col-start-1 cursor-pointer"
        >
          Save Changes
        </button>
      </div>

      <div className="rounded-lg shadow-md py-6 min-h-screen px-4 mb-15 mt-10 bg-white w-full">
        <div id="editorjs" />
      </div>
    </div>
  );
}
