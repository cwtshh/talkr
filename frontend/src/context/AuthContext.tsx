import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { API_URL } from "../constants/constants";
import { NotifyToast } from "../components/Toastify/NotifyToast";


interface AuthContextType {
    user: any;
    login: (login_data: LoginData) => Promise<boolean>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

interface LoginData {
    email: string;
    password: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [ user, setUser ] = useState(null);
    const [ isReady, setReady ] = useState(false);

    const login = async(login_data: LoginData) => {
        let success = false;
        await axios.post(`${API_URL}/user/login`, login_data, { withCredentials: true}).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            success = true;
        }).catch((err) => {
            // console.log(err);
            NotifyToast({ message: err.response.data, type: 'error' });
            success = false;
        })
        return success;
    };

    const logout = async() => {
        await axios.post(`${API_URL}/user/logout`, {}, { withCredentials: true }).then((res) => {
            localStorage.removeItem('user');
            setUser(null);
            NotifyToast({ message: res.data, type: 'success' });
        }).catch(() => {
            NotifyToast({ message: "Error on logout", type: 'error' });
        })
    }

    const retriver_user_data = async() => {
        const user: any = JSON.parse(localStorage.getItem('user') || '{}');
        if(!user) {
            setReady(true);
            return;
        }
        setUser(user);
        setReady(true);
    }

    useEffect(() => {
        retriver_user_data();
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout
        }}>
            { isReady ? children : null }
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;