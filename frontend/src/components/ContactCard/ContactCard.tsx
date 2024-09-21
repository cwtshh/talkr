import React from 'react'
import { FaCheck } from 'react-icons/fa'

const ContactCard = () => {
  return (
    <div className='flex items-center bg-base-300 h-32 rounded-2xl p-4'>
        <div className="avatar">
            <div className="w-20 rounded-3xl">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        </div>
        <div className='h-full p-4'>
            <h2 className='font-bold text-xl'>Fulano</h2>
            <div className='flex items-center gap-2'>
                <h3>Last Message </h3>
                <FaCheck />
            </div>
            <div>
                <p className='italic'>12:30 - 10/10/2024</p>
            </div>
        </div>
    </div>  
  )
}

export default ContactCard