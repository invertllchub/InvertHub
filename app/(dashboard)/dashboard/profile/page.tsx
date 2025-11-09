
import { Pencil } from 'lucide-react';
import Image from 'next/image';

const team = [
    {
        name: "Mohamed Tharwat", 
        jobDescription: "Front-End-Developer",
        img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg"
    },
    {
        name: "Mohamed Tharwat", 
        jobDescription: "Front-End-Developer",
        img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg"
    },
    {
        name: "Mohamed Tharwat", 
        jobDescription: "Front-End-Developer",
        img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg"
    },
    {
        name: "Mohamed Tharwat", 
        jobDescription: "Front-End-Developer",
        img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg"
    },
    {
        name: "Mohamed Tharwat", 
        jobDescription: "Front-End-Developer",
        img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg"
    },
    {
        name: "Mohamed Tharwat", 
        jobDescription: "Front-End-Developer",
        img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg"
    }
]

function page() {
    return (
        <div className='pt-22 md:pt-12 md:ml-50 p-6 md:p-12 min-h-screen bg-[#D6F4ED] overflow-hidden'>
            <div className='h-full'>
                <div className='w-full h-full flex flex-col gap-8'>
                    <div className='bg-white w-full h-6/12 md:h-4/12 rounded-md shadow-md flex flex-col md:flex-row items-center gap-8 p-6'>
                        <div className='w-full md:w-6/12 flex items-center gap-12'>
                            <div  className="relative w-[70px] md:w-[100px] h-[70px] md:h-[100px] rounded-full">
                                <Image
                                alt="User Picture"
                                src={`https://res.cloudinary.com/dyfregti9/image/upload/v1757971723/samples/people/boy-snow-hoodie.jpg`}
                                fill
                                priority
                                className="object-cover rounded-md"
                                />
                            </div>
                            <div>
                                <h1 className='text-xl font-bold'>Mohamed Tharwat</h1>
                                <p className='text-gray-500'>Front-End-Developer</p>
                            </div>
                        </div>
                        <span className='h-px md:h-20 w-full md:w-px bg-black' />
                        <div className='w-full md:w-6/12 grid grid-cols-1 md:grid-cols-2'>
                            <h1 className='text-gray-500'>Staff Id : <span className='text-black'>5404884</span></h1>
                            <h1 className='text-gray-500'>Staff Account : <span className='text-black'>mohamedTh</span></h1>
                            <h1 className='text-gray-500'>Phone Number : <span className='text-black'>01067894804</span></h1>
                            <h1 className='text-gray-500'>Email : <span className='text-black'>mthawrat@gmail.com</span></h1>
                        </div>
                    </div>
                    <div className='w-full md:h-8/12 flex flex-col-reverse md:flex-row gap-8'>
                        <div className='bg-white w-full md:w-6/12 h-full rounded-md shadow-md p-8 flex flex-col gap-4'>
                            <div className='w-full flex items-center justify-between'>
                                <h1 className='text-lg text-gray-500 font-bold'>Team</h1>
                            </div>
                            <div className="border-t border-gray-500"></div>
                            <div className='w-full flex items-start justify-between'>
                                    {team && 
                                        <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 gap-3'>
                                            {team.map((mem, i) => {
                                                return (
                                                    <div key={i} className='w-full flex items-center gap-2'>
                                                        <div  className="relative w-[60px] h-[60px] rounded-full overflow-hidden">
                                                            <Image
                                                            alt="Careers picture"
                                                            src={mem.img}
                                                            fill
                                                            className="object-cover rounded-full"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h1 className='text-sm font-bold'>{mem.name}</h1>
                                                            <p className='text-xs text-gray-500'>{mem.jobDescription}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                            </div>
                        </div>
                        <div className='w-full md:w-6/12 h-full flex flex-col-reverse gap-8 md:gap-2'>
                            <div className='bg-white w-full h-6/12 rounded-md shadow-md flex flex-col gap-4 p-6'>
                                <div className='w-full flex items-center justify-between'>
                                    <h1 className='text-lg text-gray-500 font-bold'>Educational Infomation</h1>
                                    <Pencil size={20} className='text-gray-500 cursor-pointer'/>
                                </div>
                                <div className="border-t border-gray-500"></div>
                                <div className='w-full flex items-start justify-between'>
                                    <div>
                                        <h1 className='text-lg font-bold'>Bacholre of Medicine and Sergery</h1>
                                        <p className='text-gray-500'>Mansoura University</p>
                                    </div>
                                    <span>2018 - 2024</span>
                                </div>
                            </div>
                            <div className='bg-white w-full h-6/12 rounded-md shadow-md flex flex-col gap-4 p-6'>
                                <div className='w-full flex items-center justify-between'>
                                    <h1 className='text-lg text-gray-500 font-bold'>Personal Information</h1>
                                    <Pencil size={20} className='text-gray-500 cursor-pointer'/>
                                </div>
                                <div className="border-t border-gray-500"></div>
                                <div className='w-full flex items-start justify-between'>
                                    <div className='h-full grid grid-cols-1 md:grid-cols-2 gap-2'>
                                        <h1 className='text-gray-500'>Gender: <span className='text-black'>Male</span></h1>
                                        <h1 className='text-gray-500'>Current Adress: <span className='text-black'>Mansoura, Egypt</span></h1>
                                        <h1 className='text-gray-500'>Date of birth: <span className='text-black'>9th jul, 2001</span></h1>
                                    </div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
