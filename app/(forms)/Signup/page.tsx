import SignupForm from '@/components/forms/SignupForm'
import React from 'react'

function page() {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full md:w-6/12">
                <div className="text-start w-full mx-auto p-4">
                    <h1 className="text-3xl font-bold text-gray-800">Signup</h1>
                    <p className="text-gray-500 mt-2">Create your account</p>
                </div>
                <SignupForm />
            </div>
        </div>
    )
}

export default page
