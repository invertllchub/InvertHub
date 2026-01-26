
import Link from 'next/link'
import Image from 'next/image'
// Types
import { User } from '@/types/users'
// Icons
import { Pencil } from 'lucide-react'

type userProp = {
    user: User
}
function ProfileCard({user}: userProp) {
    const defaultImage = "https://res.cloudinary.com/dyfregti9/image/upload/v1761832027/INVERT-HUB/zvakmojuzfa5t9ty85r9.jpg"
    return (

        <div className="w-full h-full max-h-full bg-white rounded-3xl shadow-lg flex flex-col p-6 gap-6">

            <div className='w-full flex justify-between items-center'>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700">User Profile</h2>
                <Link
                title='Edit user profile'
                href={`/dashboard/profile/${user?.id}/edit`}
                >
                    <Pencil size={20} className=" text-gray-500 cursor-pointer" />
                </Link>
            </div>

            <div className="w-full border-t border-gray-200" />

            <div className="w-full flex flex-col md:flex-row items-center justify-between p-6 md:p-12">
                {/* User Image */}
                <div className="relative w-40 md:w-60 h-40 md:h-60 rounded-2xl overflow-hidden shadow-md">
                    <Image 
                    src={user?.imageUrl || defaultImage} 
                    alt="User" 
                    fill 
                    sizes="(max-width: 768px) 10rem, 15rem"
                    loading='eager'
                    className="object-cover" 
                    />
                </div>
                {/* Basic Info */}
                <div className="text-center flex flex-col gap-2 p-10">
                    <h1 className="text-xl md:text-3xl font-bold text-gray-800">{user?.fullName}</h1>
                    <p className="text-gray-500 text-lg">{user?.jobTitle}</p>
                    <p>Email: <span className="text-black font-medium">{user?.email}</span></p>
                    <p>Phone: <span className="text-black font-medium">{user?.phoneNumber}</span></p>
                </div>
            </div>


            {/* Personal Info Card */}
            <div className="w-full bg-gray-50 rounded-2xl p-4 shadow-inner flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-700">Personal Info</h2>
                </div>

                <div className="border-t border-gray-200 my-2" />

                <div className="flex flex-col gap-1 text-gray-600">
                    <p><span className="font-semibold text-gray-800">Gender:</span> {user?.gender}</p>
                    <p><span className="font-semibold text-gray-800">Age:</span> {user?.age}</p>
                    <p><span className="font-semibold text-gray-800">Address:</span> {user?.address}</p>
                    <p><span className="font-semibold text-gray-800">Role:</span> {user?.role}</p>
                </div>
            </div>

        </div>

  )
}

export default ProfileCard;
