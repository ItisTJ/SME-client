import React from 'react'
import Image from "next/image"

function mascotSection() {
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 bg-gradient-to-b from-green-950 via-black to-green-950">
    <div className="bg-blue-400 p-6 col-span-3 sm:col-span-2 flex display-flex justify-center items-center text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Our Mascots</h1>
    </div>
  <div className="bg-transparent p-6 md:col-span-2 sm:col-span-1 flex flex-col justify-center items-center text-center">
    <p className="text-lg text-white">
      Meet our delightful mascots that bring joy and personality to our brand!
    </p>
  </div>
  <div className="bg-transparent p-6 md:col-span-1 sm:col-span-1 flex justify-center items-center text-center">
    <Image src="/animation/mickey-flies.gif" alt="Mascot 1" width={400} height={800} className='rounded-4xl border-4 border-green-900 shadow-2xl hover:shadow-purple-500 hover:scale-110 transition duration-500 ease-in-out'/>
  </div>
  <div className="bg-blue-400 p-6"></div>
</div>



  )
}

export default mascotSection