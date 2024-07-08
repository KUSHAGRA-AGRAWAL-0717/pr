import React, { useEffect } from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

export default function useGetOtherUsers() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherExperts = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("/user/experts");
       
        //store
        dispatch(setOtherUsers(res.data)); 
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherExperts();
  }, []);
}
