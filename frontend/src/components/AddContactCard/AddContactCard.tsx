import React from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../../constants/constants';
import { NotifyToast } from '../Toastify/NotifyToast';

interface UserType {
    _id: string;
    name: string;
    email: string;
}

interface AddContactCardProps {
    user_d: UserType;
}


const AddContactCard: React.FC<AddContactCardProps> = ({ user_d }) => {
    const { user } = useAuth();

    const handleAddContact = async() => {
        await axios.post(`${API_URL}/user/add/contact`, {
            user_id: user._id,
            contact_id: user_d._id
        }).then(() => {
            NotifyToast({ message: 'Contact Added Successfully', type: 'success' });
        }).catch((err) => {
            NotifyToast({ message: err.response.data.message, type: 'error' });
        })
    }

    return (
        <div className='flex items-center bg-base-300 h-32 rounded-2xl p-4'>
            <div className="avatar">
                <div className="w-20 rounded-3xl">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className='ml-4'>
                <h2 className='font-bold text-sm overflow-x-hidden w-36 truncate'>{user_d.name}</h2>
            </div>
            <button onClick={() => handleAddContact()} disabled={user_d._id === user._id} className='btn w-[20%]'><IoMdAddCircleOutline fontSize={'30px'}/></button>
        </div>  
    )
}

export default AddContactCard