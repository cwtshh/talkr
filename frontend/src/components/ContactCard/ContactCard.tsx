import React from 'react'
import { FaCheck } from 'react-icons/fa'

interface UserType {
    _id: string,
    name: string,
    email: string,
    number: string,
}
interface ContactCardProps {
    user_c: UserType
}

const ContactCard = ({ user_c }: ContactCardProps) => {
  return (
    <div className='flex items-center bg-base-300 h-32 rounded-2xl p-4'>
        <div className="avatar">
            <div className="w-20 rounded-3xl">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        </div>
        <div className='h-full p-4'>
            <h2 className='font-bold text-xl'>{user_c.name}</h2>
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