import Link from "next/link"

function Section7() {
  return (
        <section className="section7  w-full bg-[#f6f6f6] text-black">
          <div className="p-6 sm:p-10 md:p-14">
            <h1 className="font-sans text-3xl sm:text-5xl md:text-[88px] font-black">
              JOIN THE TEAM
            </h1>
            <h2 className="text-xl sm:text-3xl md:text-5xl font-semibold my-6">
              Join us on a journey where creativity meets ambition, and where
              every challenge is a chance to see further. At Invert Hub, we
              value new perspectives, bold ideas, and the drive to shape what
              comes next. The usual angles are only the beginning.
            </h2>
            <Link href="/careers" className="relative text-xl group">
              CAREERS
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-black scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
            </Link>
          </div>
        </section>
  )
}

export default Section7
