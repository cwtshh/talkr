
import axios from 'axios'
import ContactCard from '../ContactCard/ContactCard'
import { API_URL } from '../../constants/constants'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import { NotifyToast } from '../Toastify/NotifyToast'
import { useNavigate } from 'react-router-dom'

interface UserConversationType {
  _id: string,
  name: string,
  email: string,
  number: string,
}

interface ConversationType {
  _id: string,
  users: UserConversationType[],
  messages: string[],
  createdAt: string,
  updatedAt: string,
}

interface ContactListProps {
  onClick: (id: string) => void
}

const ContactList = ({ onClick }: ContactListProps) => {
  const [ conversations, setConversations ] = useState<ConversationType[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const get_all_conversations = async() => {
    if (!user) {
      NotifyToast({ message: "User not authenticated", type: "error" });
      navigate('/');
      return;
    }
    await axios.get(`${API_URL}/user/get/conversations/${user._id}`, { withCredentials: true }).then((res) => {
      setConversations(res.data.conversations);
    }).catch((err) => {
      console.log(err);
      NotifyToast({ message: "Failed to get conversations", type: "error" });
    })
  };

  useEffect(() => {
    get_all_conversations();
  }, []);


  return (
    <div className='flex flex-col gap-2'>
      {conversations.map((conversation: ConversationType) => {
        const other_user = user ? conversation.users.filter((u: UserConversationType) => u._id !== user._id)[0] : null;
        return (
          other_user && <button onClick={() => onClick(other_user._id)}><ContactCard key={conversation._id} user_c={other_user}/></button>
        )
      })}
    </div>
  )
}

export default ContactList