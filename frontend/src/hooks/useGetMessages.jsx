import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';


const useGetMessages= ()=>{
    const {selectedUser}=useSelector(store=>store.user);
    console.log(selectedUser)
    const dispatch=useDispatch();
       useEffect(()=>{
        const fetchMessages=async ()=>{
            try {
                axios.defaults.withCredentials=true;
                const selected=selectedUser._id;
                const res=await axios.get("/message/"+selected);
                console.log(res);
                dispatch(setMessages(res.data))
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();

       },[selectedUser])
}

export default useGetMessages