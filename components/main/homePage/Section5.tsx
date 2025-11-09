
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ImageBlock = dynamic(() => import('../ImageBlock'), {
  loading: () => (
    <div className="flex items-center justify-center h-screen text-white">
      Loading projects...
    </div>
  )
})


function Section5() {
  return (
      <section className="section5 w-full bg-[#f6f6f6] text-black p-6 sm:p-10 md:p-16 mt-12">
        <h1 className="font-sans text-3xl sm:text-5xl md:text-[88px] font-extrabold leading-tight">
          BEYOND <br /> CREATIVITY
        </h1>
        <h2 className="text-xl sm:text-3xl md:text-5xl font-semibold mt-6 mb-16">
          Invert Hub is where ideas grow into impact. We work across creative
          niches—from design and architecture to AI publishing, coaching, and
          innovation—bringing them together under one vision. By blending
          creativity with strategy, technology, and business thinking, we
          deliver solutions that reach beyond the brief and open new
          possibilities.
        </h2>
        <Link href="/services" className="relative text-xl group">
          OUR SERVICES
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-black scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
        </Link>
        <ImageBlock 
        alt='Creativity'
        src='https://res.cloudinary.com/dyfregti9/image/upload/v1758050779/Home_Sec3_BeyondCreativity_kxeqal.png'
        />
      </section>
  )
}

export default Section5
