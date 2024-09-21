import React from 'react'

interface UserType {
    _id: string;
    name: string;
    email: string;
}

interface AddContactCardProps {
    user: UserType;
}


const AddContactCard: React.FC<AddContactCardProps> = ({ user }) => {
  return (
    <div className='flex items-center bg-base-300 h-32 rounded-2xl p-4'>
        <div className="avatar">
            <div className="w-20 rounded-3xl">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        </div>
        <div className='h-full p-4'>
            <h2 className='font-bold text-xl'>{user.name}</h2>
        </div>
    </div>  
  )
}

export default AddContactCard