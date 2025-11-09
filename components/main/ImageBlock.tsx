import Image from 'next/image'
import React from 'react';

type ImageProps = {
    alt: string;
    src: string;
}

function ImageBlock({alt, src}: ImageProps) {
    return (
        <div className="relative mt-10 w-full object-cover h-[400px] md:h-[800px] rounded-md overflow-hidden">
            <Image
            alt={alt}
            src={src}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            />
        </div>
    )
}

export default React.memo(ImageBlock);
