"use client"
import React, { ChangeEvent, useState } from 'react'


type uploadStatus = "ideal" | "uploading" | "success" | "error";

function page() {
  const [file, setFiles] = useState<File | null>(null);
  const [status, setStatus] = useState<uploadStatus>('ideal')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      setFiles(e.target.files[0])
    }
  }

  const handleFileUpload = async () => {
    if(!file) return;
    setStatus("uploading")

    const formData = new FormData()
    formData.append('file', file)

    try {
      await fetch('https://httpbin.org/post', {
        method: "POST",
        body: formData
      })
      setStatus('success')
    } catch (error) {
      setStatus('error')
    }
  }
  return (
    <div className='ml-20'>

      <input type="file" onChange={handleFileChange}/>

      {file &&
      <div>
        <p>{file?.name}</p>
        <p>{(file?.size / 1024).toFixed(2)}</p>
        <p>{file?.type}</p>
      </div>
      }
      {file && status !== "uploading" && 
        <button 
        onClick={handleFileUpload}
        className='p-8 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md'
        >Upload File</button>
      }
      {status === 'success' && 
        <p className='text-sm text-green-600'>File uploaded successfuly</p>
      }
      {status === 'error' && 
        <p className='text-sm text-red-600'>Upload failed, please try again</p>
      }
    </div>
  )
}

export default page
