import Link from 'next/link'

function Section2() {
  return (
        <section className="section2 w-full py-10 md:py-16 text-start">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-black px-4 md:px-16">
            We scale creative visions across disciplines, platforms, and
            industries. We build systems that support both expression and
            execution. Our work connects design thinking with real-world growth.
          </h2>
          <div className="w-full text-start px-4 md:px-16 mt-6 md:mt-10">
            <div className="w-full md:w-6/12 md:ml-auto">
              <p className="text-lg md:text-xl font-semibold text-gray-700 mb-10">
                INVERT LLC merges architecture, publishing, innovation, and tech
                into one powerhouse. We help studios, startups, and creatives
                design better systems from real-world environments to digital
                business frameworks and turn their work into scalable success.
              </p>
              <Link href="/about" className="relative text-xl group">
                ABOUT US
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-black scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
              </Link>
            </div>
          </div>
        </section>
  )
}

export default Section2
