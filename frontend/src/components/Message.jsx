import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector(store => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (
    <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`} style={{alignItems:'center',justifyContent:'center'}}>
      <div className="chat-image avatar">
        <div className="">
          <p className="text-1xl" style={{fontSize:'9px'}}>{authUser?.username}</p>
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 text-white" style={{fontSize:'9px'}}>{formatTime(message.createdAt)}</time>
      </div>
      <div className="chat-bubble">{message?.message}</div>
    </div>
  );
}

export default Message;
