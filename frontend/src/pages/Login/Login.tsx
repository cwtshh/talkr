import React, { useState } from "react"
import NavBar from "../../components/navbar/NavBar"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { NotifyToast } from "../../components/Toastify/NotifyToast";



const Login = () => {
    const { login } = useAuth();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(await login({ email, password })) {
            navigate('/user/chats');
            return;
        }
        NotifyToast({ message: 'Invalid credentials', type: 'error' });
    }   


    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center justify-center mt-20">
                <div className=" p-6 rounded-xl w-1/4 shadow-xl">
                    <form onSubmit={handleLogin} className="flex flex-col gap-10">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col gap-6 mt-6">
                    <h2 className="font-bold ">Not Registred Yet?</h2>
                    <button className="btn btn-primary" onClick={() => navigate('/register')}>SignUp</button>
                </div>
            </div>
        </div>
    )
}

export default Login