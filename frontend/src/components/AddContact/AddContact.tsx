import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../constants/constants';
import { NotifyToast } from '../Toastify/NotifyToast';
import AddContactCard from '../AddContactCard/AddContactCard';

interface UserType {
    _id: string;
    name: string;
    email: string;
}

const AddContact = () => {
    const [ users, setUsers ] = useState<UserType[]>([]);

    const get_all_users = async() => {
        await axios.get(`${API_URL}/user/get/all`, { withCredentials: true }).then((res) => {
            // console.log(res.data.users);
            setUsers(res.data.users);
            // console.log(users);
        }).catch((err) => {
            console.log(err);
            NotifyToast({ message: "Failed to get users", type: "error" });
        });
    }

    useEffect(() => {
        get_all_users();
    }, [])

    return (
        <div className='flex flex-col gap-2'>
            {users.map((user_in, index) => {
                return (
                    <AddContactCard key={index} user_d={user_in} />
                )
            })}
        </div>
    )
}

export default AddContact