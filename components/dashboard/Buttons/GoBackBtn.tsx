import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function GoBackBtn() {
    const router = useRouter();
    return (
        <button 
        className='flex items-center justify-center cursor-pointer'
        onClick={() => {router.back()}}
        >
            <ChevronLeft size={20}/> <span>Back</span>
        </button>
    )
}

export default GoBackBtn;
