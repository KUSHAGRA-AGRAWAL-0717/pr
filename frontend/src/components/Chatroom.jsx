import React from 'react'
import  MessageContainer  from './MessageContainer.jsx'
import Sidebar from './Sidebar.jsx'
 const  Chatroom = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[650px] rounded-lg overflow-hidden bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <p >Chatroom</p>
        <Sidebar/>
        <MessageContainer/>
    </div>
  )
}
export default Chatroom

