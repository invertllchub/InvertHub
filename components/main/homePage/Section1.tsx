
import ScreenText from './ScreenText'

function Section1() {
  return (
      <section className="section1 dark-section relative overflow-hidden h-screen">
        <div className="wrapper h-full relative flex justify-center items-center p-4 md:justify-start md:p-1">
          <div className="absolute inset-0 w-full h-full shadow-lg">
            <div className="relative w-full h-full overflow-hidden">
              <video
                src="https://res.cloudinary.com/dyfregti9/video/upload/v1758050780/Home_Header_bdgnzn.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              />
              <ScreenText />
            </div>
          </div>
        </div>
      </section>
  )
}

export default Section1

