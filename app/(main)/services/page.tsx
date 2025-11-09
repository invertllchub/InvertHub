
import dynamic from 'next/dynamic'
// Components
const YellowCard = dynamic(() => import('@/components/main/YellowCard'), {
    loading: () => (
        <div className="flex items-center justify-center h-screen text-white">
            Loading projects...
        </div>
    )
})
const ImageBlock = dynamic(() => import('@/components/main/ImageBlock'), {
    loading: () => (
        <div className="flex items-center justify-center h-screen text-white">
            Loading projects...
        </div>
    )
})


function Page() {
    return (
        <div className='w-full py-30 px-4 md:px-16'>
            <h1 className='w-full text-4xl md:text-9xl font-extrabold'>OUR SERVICES</h1>
            <p className='text-2xl md:text-4xl font-semibold mt-6'>
                Our ambition knows no bounds. If building a sustainable city in space is the goal,
                we’ll plan it, design it, and engineer it. With our expanding services and global expertise,
                we go far beyond architecture.
            </p>
            <div className="relative w-full h-[300px] md:h-screen mt-16">
                <video
                src="https://res.cloudinary.com/dyfregti9/video/upload/v1758483229/services_header_yevxmx.mp4"
                autoPlay
                loop
                muted
                preload="auto"
                className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <section className='w-full mt-32'>
                <h1 className='w-full text-4xl md:text-8xl font-bold'>DESIGN</h1>
                <p className='text-2xl md:text-4xl font-semibold mt-6'>
                    Delivering transformative design solutions across all scales and disciplines,
                    blending decades of expertise with a global reach.
                </p>
                <ImageBlock 
                alt='Design picture'
                src='https://res.cloudinary.com/dyfregti9/image/upload/v1758050583/Ourservices_Sec1_01_kjfbpn.png'
                />
            </section>
            <section className='w-full mt-32'>
                <h1 className='w-full text-4xl md:text-8xl font-bold'>CONSULTING</h1>
                <p className='text-2xl md:text-4xl font-semibold mt-6'>
                    Unlocking new possibilities in sustainability, economics, technology,
                    and health to guide clients to navigate and increase impact and seize upon
                    opportunities that others might overlook.
                </p>
                <ImageBlock 
                alt='Consulting picture'
                src='https://res.cloudinary.com/dyfregti9/image/upload/v1758050567/Ourservices_Sec1_02_avnr2t.png'
                />
            </section>
            <section className='w-full h-screen bg-white'>
                <YellowCard
                h1={`Integrated Solutions`}
                p={`We connect architecture, urban planning, interior and product design, publishing,
                and business coaching with consulting services that address everyday challenges in creative 
                industries. Our approach blends design with strategy, offering solutions that are both 
                practical and forward-looking. Curious to know more?`}
                link={`GET IN TOUCH`}
                img={`https://res.cloudinary.com/dyfregti9/image/upload/v1758487075/Homepage_last_sectoin_yvyyo8.png`}
                alt={`Description`}
                />
            </section>
        </div>
    )
}

export default Page
