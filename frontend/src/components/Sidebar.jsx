import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OtherExperts from "./OtherExperts";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";


export default function Sidebar() {
  const [search,setSearch]=useState("")
  const {otherUsers}=useSelector(store=>store.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const logoutHandler=async()=>{
      try{
         const res=await axios.get("/user/logout");
         navigate("/login")
         toast.success(res.data.message)
      }catch(error){
          console.log(error);
      }
  }
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user)=> user.username.toLowerCase().includes(search.toLowerCase()));
    if(conversationUser){
        dispatch(setOtherUsers([conversationUser]));
    }else{
        toast.error("User not found!");
    } 
}
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
    <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
        <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className='input input-bordered rounded-md' type="text"
            placeholder='Search...'
        />
        <button type="submit" className="btn bg-zinc-700 text-white">
          <FaSearch className="w-6 h-6 outline-none"/>
        </button>
      </form>
      <div className="divider">

      </div>
      <OtherExperts/>
      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sn">
          Logout
        </button>
      </div>
    </div>
  );
}


