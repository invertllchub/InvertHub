"use client"

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
// Components
const ImageBlock = dynamic(() => import('@/components/main/ImageBlock'), {
    loading: () => (
        <div className="flex items-center justify-center h-screen text-white">
            Loading projects...
        </div>
    )
})
const YellowCard = dynamic(() => import('@/components/main/YellowCard'), {
    loading: () => (
        <div className="flex items-center justify-center h-screen text-white">
            Loading projects...
        </div>
    )
})


function page() {

    const Blocks = [
        {
            title: "- Systems Thinking for Creative Growth", 
            paragraph: "We research how to help creative professionals install repeatable, scalable systems—so they can grow their business without sacrificing their craft.", 
        },
        {
            label: "- AI-Augmented Design & Process Optimization", 
            slug: "From image generation to prompt-based automation, we explore how AI can serve as a collaborator, not just a tool, in the design process.", 
        },
        {
            title: "- Behavioral Branding & Identity Models", 
            paragraph: "We apply behavioral science and branding psychology to help creators develop powerful, emotionally resonant brand identities that convert.", 
        },
        {
            title: "🏗️ ERP & Platform Development", 
            paragraph: (
                <>
                Our cloud-based platform,{" "}
                <Link
                href="https://akarati.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-blue-600 hover:underline"
                >
                    Akarati
                </Link>
                , is a smart ERP solution built for the future of real estate—integrating BIM, automation, and AI to streamline operations.
                </>
            ),
        },
        {
            title: "- Digital Ecosystems & E-Commerce Experiences", 
            paragraph: (
                <>
                With projects like,{" "}
                <Link
                href="https://revitesse.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-blue-600 hover:underline"
                >
                    Revitesse
                </Link>
                , we reimagine how luxury brands can operate online—blending aesthetics, automation, and seamless user experience to create digital spaces that feel as refined as their products.
                </>
            ),
        },
        {
            title: "- Creative Workflows & Prompt Engineering", 
            paragraph: "We experiment with visual language systems and AI prompt strategies to speed up ideation, prototyping, and content creation for artists, architects, and designers.", 
        },
    ]
    return (
        <div className='w-full py-30 px-6 md:px-16 mt-12 overflow-x-hidden'>
            <section className='w-full'>
                <h1 className='w-full text-4xl md:text-9xl font-extrabold'>RESEARCH AND INNOVATION</h1>
                <p className='text-xl md:text-4xl font-semibold mt-6'>
                    At INVERT, we don’t chase trends, we build what’s next.
                    We approach every project with strategic clarity, system-based thinking, 
                    and bold experimentation. Our work sits at the intersection of design, 
                    artificial intelligence, automation, and real-world business challenges, 
                    bridging vision with execution.
                    Research and Innovation aren’t side tracks, they are the core engine powering every 
                    initiative across INVERT: from coaching programs and digital platforms to architecture, 
                    publishing, and scalable business systems.
                </p>
            </section>
            <section>
                <div className="relative w-full h-[300px] md:h-screen mt-16">
                    <video
                    src="https://res.cloudinary.com/dyfregti9/video/upload/v1759590818/R_D_Header_uztekb.mp4"
                    autoPlay
                    loop
                    muted
                    aria-label='video about our research and innovation'
                    className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </section>
            <section className='w-full mt-20'>
                <h1 className='w-full text-2xl md:text-4xl font-bold'>Innovation With Purpose</h1>
                <p className='text-xl md:text-2xl font-semibold mt-6'>
                    We believe innovation is only meaningful when it's human-centered, scalable, 
                    and deeply integrated into real-world workflows. 
                    That’s why every R&D effort at INVERT is tied to solving systemic challenges across 
                    the industries we serve—from creative entrepreneurship to real estate tech 
                    and AI-integrated design.
                    We focus on building tools, frameworks, and digital ecosystems that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-10">
                    <li>Help creators scale without burning out</li>
                    <li>Bring automation and intelligence into legacy industries</li>
                    <li>Create platforms that empower—not replace—human creativity</li>
                    <li className='font-bold'>Make visionary design and strategic thinking accessible to everyone—creators, companies, individuals, and communities alike</li>
                </ul>
            </section>
            <section className='w-full h-screen mt-25'>
                <div className='w-full h-full flex flex-col md:flex-row items-center gap-12 md:gap-4'>
                    <div className='w-full md:w-6/12 h-full'>
                        <h1 className='w-full text-2xl md:text-4xl font-bold mb-10'>Our Innovation Model</h1>
                        <p className='text-xl md:text-2xl font-semibold mt-6'>
                            At INVERT, R&D flows through what we call our Living Systems Model:
                        </p>
                        <ul className="list-decimal pl-6 space-y-2 text-gray-700 marker:text-black marker:font-bold mt-10">
                            <li>
                                <h3 className='text-black font-bold'>Research the real problem</h3>
                                <p>We dig beneath the surface to uncover root causes—what’s invisible, not just what’s urgent.</p>
                            </li>
                            <li>
                                <h3 className='text-black font-bold'>Prototype solutions</h3>
                                <p>We create agile, scalable systems—from AI-powered tools and design workflows to coaching models and business frameworks.</p>
                            </li>
                            <li>
                                <h3 className='text-black font-bold'>Deploy and refine</h3>
                                <p>We launch, test, and iterate across real businesses inside our ecosystem—constantly optimizing based on feedback.</p>
                            </li>
                            <li>
                                <h3 className='text-black font-bold'>Open source & share</h3>
                                <p>We publish our insights through WOW WORLD Magazine, ArchYards, and our consulting programs—turning knowledge into tools for the global creative community.</p>
                            </li>
                        </ul>
                    </div>
                    <div className='w-full md:w-6/12 h-full'>
                        <div  className="relative w-full h-full">
                            <Image
                            alt="Innovation Model"
                            src="https://res.cloudinary.com/dyfregti9/image/upload/v1759591630/R_D_Sec3_gxaduq.png"
                            fill
                            className="object-cover rounded-md"
                        />
                        </div>
                    </div>
                </div>
            </section>
            <section className='w-full mt-20'>
                <h1 className='w-full text-2xl md:text-4xl font-bold'>Areas of Exploration</h1>
                <div  className="relative w-full h-[40vh] md:h-screen mt-15">
                    <ImageBlock 
                    alt='Areas of Exploration'
                    src='https://res.cloudinary.com/dyfregti9/image/upload/v1759331654/R_D_02.png_zgm3qb.png'
                    />
                </div>
                <div className='w-full mt-15'>
                    {Blocks.map((b, i) => {
                        return (
                            <div key={i} className='w-full leading-8'>
                                <h3 className='text-black font-bold'>{b.title}</h3>
                                <p className='pl-6 text-gray-700'>{b.paragraph}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
            <section className='w-full h-[90vh] mt-32'>
                <YellowCard 
                h1={`Want to Collaborate With Us?`}
                p={`We partner with creators, studios, and visionary companies who believe the future isn’t something to wait for—it’s something we can design.
                👉 Let’s co-create the tools and systems that will define the next decade.`}
                link={`Join Our Innovation Network`}
                img={`https://res.cloudinary.com/dyfregti9/image/upload/v1759591630/R_D_Footer_gdzjtw.png`}
                alt={`Innovation Network`}
                />
            </section>
        </div>
    )
}

export default page
