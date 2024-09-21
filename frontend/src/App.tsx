import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ChatWindow from './pages/ChatWindow/ChatWindow';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/user/chats' element={<ChatWindow />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
