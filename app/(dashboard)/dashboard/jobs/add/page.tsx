"use client"

// Components
import AddJobForm from '@/components/dashboard/jobsComponents/AddJobForm'
import PublishBtn from '@/components/dashboard/Buttons/PublishBtn';
import GoBackBtn from '@/components/dashboard/Buttons/GoBackBtn';


function page() {

    
    return (
        <div className='pt-22 md:pt-12 md:ml-50 p-6 md:p-20 min-h-screen bg-(--secondary) overflow-hidden'>
            <div className="w-full bg-white flex md:flex-row items-center justify-between gap-6 p-6 
            rounded-t-lg shadow-md border-b border-gray-500">

                <div className='flex items-center justify-center gap-8'>
                    <GoBackBtn />
                    <div className='text-gray-500'>
                        Job list  /  Create job
                    </div>
                </div>
                <div className='hidden md:block'>
                    <PublishBtn text="Publish Now" form='add-job-form'/>
                </div>

            </div>
            <div className='bg-white mb-10 rounded-b-lg shadow-md p-6 md:p-12'>
                <h1 className="text-2xl md:text-4xl font-extrabold text-(--primary) mb-10">Create Job</h1>
                <AddJobForm />
                <div className='md:hidden w-full flex items-center justify-center mt-10'>
                    <PublishBtn text="Publish Now" form='add-job-form'/>
                </div>
            </div>
        </div>
    )
}

export default page
