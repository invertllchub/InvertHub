
import Link from 'next/link'
import Image from 'next/image'

type YellowCardProps = {
    h1?: string,
    p: string;
    link: string;
    img: string;
    alt: string;
}

function YellowCard({h1, p, link, img, alt}: YellowCardProps) {
    return (
        <div
        className="w-full h-full flex flex-col lg:flex-row items-center justify-between gap-8 mt-10 py-4 md:py-10 px-4 
        bg-linear-to-l from-green-200/50 to-yellow-200/60 rounded-lg"
        >
            <div className="w-full md:w-8/12 h-7/12 md:h-full flex flex-col text-start p-2 gap-6">
                {h1 && 
                    <h1  className="text-2xl md:text-5xl font-bold">{h1}</h1>
                }
                <p className="text-md md:text-3xl font-semibold">
                    {p}
                </p>
                <Link href="contact" className="relative text-xl group w-fit">
                    {link}
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-black scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
                </Link>
            </div>
            <div className="relative w-full md:w-4/12 h-5/12 md:h-full rounded-md overflow-hidden">
                <Image
                alt={alt}
                src={img}
                fill
                className="object-cover"
                />
            </div>
        </div>
    )
}

export default YellowCard
