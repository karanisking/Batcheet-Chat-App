import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '..';

const Signup = () => {
  const [user, setUser] = useState(({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  }));
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender })
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        header: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if(res.data.success){
        navigate("/login");
         toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }

  return (
    <div className='w-2/5 pt-7 mx-auto'>
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className='text-3xl font-bold  text-black text-center'>Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='label p2'>
              <span className='text-base font-bold text-gray-900 label-text'>Full Name</span>
            </label>
            <input value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })} className='w-full input input-bordered h-10' type="text" placeholder='Full Name' />
          </div>
          <div>
            <label className='label p2'>
              <span className='text-base font-bold text-gray-900 label-text'>Username</span>
            </label>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className='w-full input input-bordered h-10' type="text" placeholder='Username' />
          </div>
          <div>
            <label className='label p2'>
              <span className='text-base font-bold text-gray-900 label-text'>Password</span>
            </label>
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className='w-full input input-bordered h-10' type="password" placeholder='Password' />
          </div>
          <div>
            <label className='label p2'>
              <span className='text-base font-bold text-gray-900 label-text'>Confirm Password</span>
            </label>
            <input value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} className='w-full input input-bordered h-10' type="password" placeholder='Confirm Password' />
          </div>
          <div className='flex items-center'>
            <div className='flex items-center'>
              <p className='font-bold text-gray-900'>Male</p>
              <input checked={user.gender === "male"} onChange={() => handleCheckbox("male")} type="checkbox" defaultChecked className="checkbox bg-gray-700 mx-2 my-4" />
            </div>
            <div className='flex items-center'>
              <p className='font-bold text-gray-900'>Female</p>
              <input checked={user.gender === "female"} onChange={() => handleCheckbox("female")} type="checkbox" defaultChecked className="checkbox  bg-gray-700 mx-2" />
            </div>
          </div>
          <p className='text-center font-bold text-slate-800 my-2'>Already have an account ?  <Link to="/login" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Login</Link></p>
          <div>
            <button type='submit' className='btn btn-block h-12 bg-blue-500 text-white bg-blue btn-sm mt-2 border-slate-700'>Signup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
