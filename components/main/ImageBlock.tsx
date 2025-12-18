import Image from "next/image";
import React from "react";

type ImageProps = {
  alt: string;
  src: string;
  priority?: boolean;
};

function ImageBlock({ alt, src, priority = false }: ImageProps) {
    return (
    <div className="relative w-full h-[400px] md:h-[800px] rounded-md overflow-hidden">
        <Image
        alt={alt}
        src={src}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 1600px"
        unoptimized
        className="object-cover"
        />
    </div>
    );
}

export default React.memo(ImageBlock);
