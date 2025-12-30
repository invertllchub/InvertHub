
import Image from 'next/image';

function TeamCard() {

    const team = [
        { name: "John Doe", job: "Back-End Developer", img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg" },
        { name: "Jane Smith", job: "UI/UX Designer", img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg" },
        { name: "Alice Johnson", job: "QA Engineer", img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg" },
    ];

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {team.map((member, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                            <Image 
                            src={member.img} 
                            alt={member.name} 
                            fill 
                            sizes="4rem"
                            className="object-cover" />
                        </div>
                        <h4 className="text-sm font-bold text-gray-800">{member.name}</h4>
                        <p className="text-xs text-gray-500">{member.job}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TeamCard
