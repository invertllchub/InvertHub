import AddJobForm from '@/components/dashboard/jobsComponents/AddJobForm'
import React from 'react'

function page() {
    return (
        <div className="pl-0 md:pl-30 pr-0 md:pr-15 py-10 overflow-hidden bg-gray-200/75">
            <div className="w-full flex md:flex-row items-center justify-between gap-6 p-6 md:p-12">
                <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800">ADD NEW JOB</h1>
                <button
                form='add-job-form'
                type="submit"
                className="px-4 w-42 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg col-start-1 cursor-pointer"
                >
                    Save Changes
                </button>
            </div>
            <div className='mb-10'>
                <AddJobForm />
            </div>
        </div>
    )
}

export default page
