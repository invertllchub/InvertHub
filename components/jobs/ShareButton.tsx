"use client"
import React from 'react'

type ShareButtonProps = {
    title: string
}

const ShareButton: React.FC<ShareButtonProps> = ({ title }) => {
    const handleShare = async () => {
        const shareData = {
            title,
            text: `Check out this job: ${title}`,
            url: window.location.href,
        }

        try {
            if (navigator.share) {
                await navigator.share(shareData)
            } else {
                const shareUrl = encodeURIComponent(shareData.url)
                const twitter = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(title)}`
                const facebook = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
                const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`

                window.open(twitter, "_blank", "width=600,height=400")
                window.open(facebook, "_blank", "width=600,height=400")
                window.open(linkedin, "_blank", "width=600,height=400")
            }
        } catch (err) {
            console.error("Error sharing:", err)
        }
    }

    return (
        <button
        onClick={handleShare}
        className="py-2 px-4 rounded-md shadow-md bg-white border border-black 
        font-bold text-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition"
        >
            <span>Share Job</span>
        </button>
    )
}

export default ShareButton
