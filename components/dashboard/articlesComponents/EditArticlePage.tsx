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
import { showToast } from "@/components/toast/Toast";
// Types
import { Article } from "@/types/articles";
// Components
import PublishBtn from "../Buttons/PublishBtn";
import GoBackBtn from "../Buttons/GoBackBtn";
// React Query Hook
import useEditArticle from "@/hooks/articles/useEditArticle";

export default function EditArticlePage() {
  const { mutate } = useEditArticle();
  const editorRef = useRef<EditorJS | null>(null);
  const [articles, setArticles] = useState<Article []>([])
  const params = useParams();
  const articleId = Number(params.id);
  const article = articles.find((p) => p.id === articleId);


  const fetchData = async () => {
    const response = await fetch('/articles.json');
    const result = await response.json();
    setArticles(result)
  }

  useEffect(()=>{
    fetchData()
  }, [])

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
          overview: OverviewTool,
        },
      });
      editorRef.current = editor;
    };

    if (article && !editorRef.current) {
      initEditor();
    }

    return () => {
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [article]);

  const handleSave = async () => {
    const outputData = await editorRef.current?.save();
    if (!outputData || !outputData.blocks || outputData.blocks.length === 0) {
      console.error("No blocks found");
      return;
    };
    const blocks = outputData.blocks;
    const title = blocks[0].data.text;
    const overview = blocks[1].data.text;
    const toastId = showToast("loading", {
      message: "Publishing Article...",
    });

    const payload = {
      title: title,
      overview: overview,
      blocks: blocks,
      author: article?.author,
      updatedBy: "Mohamed",
    };

    console.log(payload)

    mutate(payload, {
      onSuccess: () => {
        showToast("success", {
          message: "Article updated successfully!",
          toastId,
        });
      },
      onError: (err: any) => {
        showToast("error", {
          message: err.message || "Failed to update Article",
          toastId,
        });
      },
    });
  };



  return (
        <div className='pt-22 md:pt-12 md:ml-50 p-6 md:p-20 min-h-screen bg-(--secondary) overflow-hidden'>
            <div className="w-full bg-white flex flex-col md:flex-row items-center justify-between gap-6 p-6 
            rounded-t-lg shadow-md border-b border-gray-500">

                <div className='flex items-center justify-center gap-8'>
                    <GoBackBtn />
                    <div className='text-gray-500'>
                        articles list  /  Update article
                    </div>
                </div>
                <div className='hidden md:block'>
                    <PublishBtn text="Edit Article" onClick={handleSave}/>
                </div>

            </div>
            <div className="bg-white mb-10 p-2 md:p-8 rounded-b-lg min-h-screen">
              <div className='border rounded-lg shadow-md min-h-screen p-4'>
                <div id="editorjs" />
              </div>
              <div className='md:hidden w-full flex items-center justify-center mt-10'>
                <PublishBtn text="Edit Article" />
              </div>
            </div>
        </div>
  );
}
