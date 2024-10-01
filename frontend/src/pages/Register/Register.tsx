import React, { useState } from 'react'
import NavBar from '../../components/navbar/NavBar'
import axios from 'axios';
import { API_URL } from '../../constants/constants';
import { NotifyToast } from '../../components/Toastify/NotifyToast';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
    const [ phone, setPhone ] = useState('');
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ seePassword, setSeePassword ] = useState(false);
    const navigate = useNavigate();

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string = e.target.value.replace(/\D/g, '');
        if (value.length > 2 && value.length <= 7) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}`;
        } else if (value.length > 7) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        }
        setPhone(value);
    };

    const handlePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSeePassword(!seePassword);
    }

    const handleRegister = async(e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(name === '' || email === '' || phone === '' || password === '') {
            NotifyToast({ message: 'Please fill all the fields', type: 'error' });
            return;
        }
        await axios.post(`${API_URL}/user/register`, { 
            name: name,
            email: email,
            number: phone,
            password: password
        }).then(() => {
            NotifyToast({ message: 'User Registered Successfully', type: 'success' });
            navigate('/');
        }).catch(() => {
            NotifyToast({ message: 'Failed to register user', type: 'error' });
        });
    }

    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center justify-center mt-20">
                    <div className=" p-6 rounded-xl w-1/4 shadow-xl">
                        <form onSubmit={handleRegister} className="flex flex-col gap-10">
                            <h1 className="text-3xl font-bold">Register</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input onChange={e => setName(e.target.value)} type="text" placeholder="Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input value={phone} onChange={handlePhoneChange} type="text" placeholder="Phone Number" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input onChange={e => setPassword(e.target.value)} type={`${seePassword ? `text` : `password`}`} className="grow" placeholder="Password" />
                                    <button onClick={handlePasswordVisibility}>
                                        {!seePassword ? <FiEye />: <FiEyeOff />}
                                    </button>
                                </label>
                            </div>
                            <button type='submit' className='btn btn-primary'>SignUp</button>
                        </form>
                    </div>
                    
                </div>
        </div>
    )
}

export default Register