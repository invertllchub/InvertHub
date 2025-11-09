"use client";

import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {ArticlePdf} from "./ArticlePdf"
import { Block } from "@/types/articles";
import { Download } from "lucide-react";

interface Props {
  blocks: Block[];
  fileName?: string;
}

export default function DownloadArticleButton({ blocks, fileName = "article.pdf" }: Props) {
    return (
        <PDFDownloadLink
        document={<ArticlePdf blocks={blocks} />}
        fileName={fileName}
        >

        {({ loading }) => (
            <button
            title="Download article as pdf"
            className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition flex items-center justify-center cursor-pointer"
            >
                <Download className={`w-5 h-5 ${loading ? "opacity-50 animate-pulse" : ""}`} />
            </button>
        )}
        </PDFDownloadLink>
    );
}
