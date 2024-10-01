import NavBar from '../../components/navbar/NavBar'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Chat from '../../components/Chat/Chat'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'
import ContactList from '../../components/ContactList/ContactList'
import { useEffect, useState } from 'react'
import AddContact from '../../components/AddContact/AddContact'

const ChatWindow = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [ isAddingContact, setIsAddingContact ] = useState(false);
    const [ selectedContact, setSelectedContact ] = useState('');

    const handleConversationChange = (id: string) => {
        setSelectedContact(id);
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const handleWindowChange = () => {
        if(isAddingContact) {
            setIsAddingContact(false);
        }
        else {
            setIsAddingContact(true);
        }
    }

    useEffect(() => {
        console.log(selectedContact);
    }, [selectedContact]);
    return (
        <div className='overflow-hidden'>
            <NavBar />

            <div className='flex justify-center h-[89vh] mt-10 '>
                <div className='flex w-[90%] h-[96%] p-6 rounded-xl shadow-2xl'>
                    <div className='bg-base-200 w-[24%] mr-5 p-4 rounded-2xl'>
                        <div className='flex justify-between items-center'>
                            <h1 className='font-bold text-xl'>Contatos</h1>
                            <div className='flex items-center'>
                                <button className='btn' onClick={() => handleWindowChange()}>
                                    <IoMdAdd />
                                </button>

                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn m-1"><BsThreeDotsVertical /></div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li><a>Profile</a></li>
                                        <li><a>Preferences</a></li>
                                        <li><button onClick={() => handleLogout()}>Logout</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mt-2 overflow-y-scroll h-[91%] rounded-xl'>
                            {!isAddingContact ? <ContactList onClick={handleConversationChange} /> : <AddContact />}
                        </div>
                    </div>

                    <div className='bg-base-200 w-[80%] rounded-2xl'>
                        <Chat selectedContact={selectedContact} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow