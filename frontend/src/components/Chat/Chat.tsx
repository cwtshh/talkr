import React from 'react'
import ChatBubbleRem from '../ChatBubble/ChatBubbleRem'
import ChatBubbleDest from '../ChatBubble/ChatBubbleDest'

const Chat = () => {
  return (
    <div className='h-full'>
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
                <ChatBubbleDest />
                <ChatBubbleRem />
        </div>
        <div className='bg-base-300 rounded-br-2xl rounded-bl-2xl'>
            <div className='flex items-center p-4 gap-3'>
                <input type="text" placeholder="Digite sua mensagem" className='input input-bordered w-full' />
                <button className='btn btn-primary'>Enviar</button>
            </div>
        </div>
    </div>
  )
}

export default Chat