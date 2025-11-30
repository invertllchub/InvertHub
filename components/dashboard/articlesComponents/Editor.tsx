"use client";

import "../../../app/(main)/globals.css";
import { useEffect, useRef } from "react";
// Editor.js & Editor tools
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import VideoTool from "@/utils/editorTools/VideoTool";
import LinkTool from "@/utils/editorTools/LinkTool";
import OverviewTool from "@/utils/editorTools/OverViewTool";
// Toast
import { showToast } from "@/components/toast/Toast";
// Upload to Cloudinary fn()
import { uploadToCloudinary } from "@/utils/CloudinaryUpload";
// Components
import GoBackBtn from "../Buttons/GoBackBtn";
import PublishBtn from "../Buttons/PublishBtn";
// React Query Hook
import useAddArticle from "@/hooks/articles/useAddArticle";

export default function Editor() {
  const { mutate } = useAddArticle();
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "Enter a heading",
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 1,
            },
          },
          overview: OverviewTool,
          link: LinkTool,
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
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                vimeo: true,
                facebook: true,
              },
            },
          },
          video: VideoTool,
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
      author: "Mohamed",
    };

    console.log(payload)

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
  };

  return (
        <div className='pt-22 md:pt-12 md:ml-50 p-6 md:p-20 min-h-screen bg-(--secondary) overflow-hidden'>
            <div className="w-full bg-white flex flex-col md:flex-row items-center justify-between gap-6 p-6 
            rounded-t-lg shadow-md border-b border-gray-500">

                <div className='flex items-center justify-center gap-8'>
                    <GoBackBtn />
                    <div className='text-gray-500'>
                        articles list  /  Create article
                    </div>
                </div>
                <div className='hidden md:block'>
                    <PublishBtn onClick={handleSave}/>
                </div>

            </div>
            <div className="bg-white mb-10 p-2 md:p-8 rounded-b-lg min-h-screen">
              <div className='border rounded-lg shadow-md min-h-screen p-4'>
                <div id="editorjs" />
              </div>
              <div className='md:hidden w-full flex items-center justify-center mt-10'>
                <PublishBtn />
              </div>
            </div>
        </div>
  );
}
