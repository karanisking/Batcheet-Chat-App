import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector } from 'react-redux'

const MessageContainer = () => {
    const {selectedUser ,onlineUsers} = useSelector(store=>store.user);
    
    const isOnline = onlineUsers?.includes(selectedUser?._id);
    console.log(onlineUsers);
    console.log(selectedUser?._id);
    console.log(isOnline);
     
  return (
    <>
        {
            selectedUser !== null? (
                <div className='h-screen w-screen flex flex-col'>
        <div className='flex gap-2 items-center text-black bg-gray-300 px-4 py-2 mb-2'>
            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                <div className='w-10 rounded-full'>
                    <img src={selectedUser?.profilePhoto} alt="user-profile" />
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <div className='flex justify-between gap-2'>
                    <p>{selectedUser?.fullName}</p>
                </div>
            </div>
        </div>
        <Messages />
        <SendInput />
      </div> 
      ) : (
        <div className='h-screen w-screen bg-white flex flex-col'>
        </div>  
      )
        }
    </>
      
  )
}

export default MessageContainer
