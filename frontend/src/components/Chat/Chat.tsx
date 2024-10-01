import React, { useEffect, useState } from 'react'
import ChatBubbleRem from '../ChatBubble/ChatBubbleRem'
import ChatBubbleDest from '../ChatBubble/ChatBubbleDest'
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../../constants/constants';
import { NotifyToast } from '../Toastify/NotifyToast';


interface ChatProps {
    selectedContact: string;
}

interface MessageType {
    text: string,
    sender: string,
    receiver: string,
    date: Date,
}

interface ConversationType {
    _id: string,
    users: string[],
    messages: MessageType[],
    createdAt: string,
    updatedAt: string,
}

interface ContactInfo {
    _id: string,
    name: string,
    email: string,
    number: string,
}

const Chat = ({ selectedContact }: ChatProps) => {
    const { user } = useAuth();
    const [ conversation, setConversation ] = useState<ConversationType>();
    const [ contactInfo, setContactInfo ] = useState<ContactInfo>();


    const get_conversation = async() => {
        await axios.get(`${API_URL}/user/get/conversation/${user?._id}/${selectedContact}`, { withCredentials: true }).then((res) => {
            setConversation(res.data.conversation);
            setContactInfo(res.data.conversation.users.filter((u: ContactInfo) => u._id !== user?._id)[0]);
            // setContactInfo(res.data.conversation.users.filter((u: string) => u !== user?._id)[0]);
        }).catch(() => {
            NotifyToast({ message: "Failed to get conversation", type: "error" });
        })
    }

    useEffect(() => {
        if(selectedContact !== '') {
            get_conversation();
        }
    }, [selectedContact])

    return (
        <div className='h-full'>
            {selectedContact === '' ? <div className='flex justify-center items-center h-full'><h1>Select a Contact to start Talkr!</h1></div> : (
                <>
                    <div className='flex items-center bg-base-300 w-full h-20 rounded-tl-2xl rounded-tr-2xl p-4'>
                        <div className="avatar">
                            <div className="w-16 rounded-3xl">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                            <div className='flex ml-4'>
                                <h1 className='font-bold text-xl'>Fulano</h1>
                                <span className='text-xs text-gray-500'>Online</span>
                            </div>
                        </div>
                    </div>
                    <div className='h-[79.2%] p-5'>
                        {conversation?.messages.length === 0 ? <div className='flex justify-center items-center h-full'><h1>Send a message to {contactInfo?.name} to start <strong>Talkr!</strong></h1></div> : (
                            <div></div>
                        )}
                    </div>
                    <div className='bg-base-300 rounded-br-2xl rounded-bl-2xl'>
                        <div className='flex items-center p-4 gap-3'>
                            <input type="text" placeholder="Digite sua mensagem" className='input input-bordered w-full' />
                            <button className='btn btn-primary'>Enviar</button>
                        </div>
                    </div>
                </>
            )}


        </div>
    )
}

export default Chat