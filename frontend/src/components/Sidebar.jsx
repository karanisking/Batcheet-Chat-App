import React, { useState, useEffect} from 'react'
import { GrSearch } from "react-icons/gr";
import axios from "axios"
import OtherUsers from './OtherUsers';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSLice';
import { BASE_URL } from '..';


const Sidebar = () => {
    const [search,setSearch] = useState("");
    const {otherUsers}  = useSelector(store=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const logoutHandler = async () => {
       try{
           const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
           toast.success(res.data.message);
           dispatch(setAuthUser(null));
           dispatch(setMessages(null));
           dispatch(setOtherUsers(null));
           dispatch(setSelectedUser(null));
       } catch(error){
        console.log(error);
       }
  }


  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user)=>user.fullName.toLowerCase().includes(search.toLocaleLowerCase()));
    if(conversationUser){
      dispatch(setOtherUsers([conversationUser]));
    }
    else{
      toast.error("User Not Found");
    }
  }
  return (
    <div className='border-r w-2/5 h-screen bg-neutral-200 border-slate-500 p-4 flex flex-col'>
      <form onSubmit={searchSubmitHandler} action='' className='flex items-center'>
        <input  value={search} onChange={(e)=>setSearch(e.target.value)} className='input w-10/12 input-bordered rounded-md bg-gray-500 ' type="text" placeholder='Search'/>
        <button type='submit' className='btn w-2/12 bg-slate-600 text-white'> <GrSearch className='w-6 h-6 outline-none'/> </button>
      </form>
      <div className="divider px-3"></div> 
      <OtherUsers />
      <div className='mt-2'>
        <button onClick={logoutHandler} className='btn btn-sm text-black bg-gray-400'>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar
