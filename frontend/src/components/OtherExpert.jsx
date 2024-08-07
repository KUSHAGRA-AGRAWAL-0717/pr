import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedUser} from "../redux/userSlice"
const OtherExpert=({user})=> {
  const dispatch=useDispatch();
  const {selectedUser} =useSelector(store=>store.user)
  const selectedUserHandler=(user)=>{ 
       dispatch(setSelectedUser(user));
  }

  return (
    <>
    <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white'} flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
      <div className="">
        <div className="flex justify-between gap-2">
         <p className="text-white">{user?.username}</p>
        </div>
      </div>
    </div>
    <div className="divider my-0 py-0 h-1"></div>
  </>
  )
}

export default OtherExpert