import React, {useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSLice';
import { BASE_URL } from '..';


const SendInput = () => {
  const [message,setMessage] = useState("");
  const dispatch = useDispatch(); 
  const {selectedUser} = useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message);
  
  const onSubmitHandler = async (e) => {
        e.preventDefault();
        try{
          const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, {message}, {
            headers:{
              "Content-Type": 'application/json'
            },
            withCredentials:true
          });
          console.log(res);
          dispatch(setMessages([...messages, res?.data?.newMessage]));
        } catch(error){
          console.log(error);
        }
        setMessage("");
  }
  return (
    <form onSubmit={onSubmitHandler} className='px-4 my-3'>
        <div className='w-full relative'>
            <input value={message} onChange={(e)=>setMessage(e.target.value)} className='border text-sm rounded-lg block w-full border-zinc-500 bg-gray-600 text-white p-3' type='text' placeholder='Send a message' />
        <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'><BsFillSendFill /></button>
        </div>
    </form>
  )
}

export default SendInput
