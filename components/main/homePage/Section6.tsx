
import Link from 'next/link'
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/states/LoadingSpinner';

const ImageBlock = dynamic(() => import('../ImageBlock'), {
  loading: () => (
    <LoadingSpinner />
  )
})

function Section6() {
  return (
      <section className="section6 dark-section w-full bg-black text-white p-6 sm:p-10 md:p-16 mt-10">
        <h1 className="text-3xl sm:text-5xl md:text-[88px] font-black ">
          RESEARCH AND <br /> INNOVATION
        </h1>
        <h2 className="text-xl sm:text-3xl md:text-5xl font-semibold mt-6 mb-16">
          We see no reason to stand still. Every project begins with a question:
          what more can be done, and how can it create greater value? By
          combining creativity with research, strategy, and technology, we push
          our capabilities forward. Our expanding work in innovation allows us
          to grow beyond expectations and open new directions across creative
          industries.
        </h2>
        <Link href="/research" className="relative text-xl group">
          FIND OUT MORE
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
        </Link>
        <div className="mt-10 md:mt-20">
          <ImageBlock 
          alt='Reaserch and Innovation'
          src='https://res.cloudinary.com/dyfregti9/image/upload/v1758050619/Home_Sec3_Research_nrz6ve.png'
          />
        </div>
      </section>
  )
}

export default Section6
