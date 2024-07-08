import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OtherUsers from './OtherExperts';

const MessageContainer = () => {
    const { selectedUser, authUser } = useSelector(store => store.user);

    

    return (
        <>
            {selectedUser !== null ? (
                <div className='md:min-w-[550px] flex flex-col'>
                    <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                        <div className='flex flex-col flex-1'>
                            <div className='flex justify-between gap-2'>
                                <p>{selectedUser?.username}</p>
                            </div>
                        </div>
                    </div>
                    
                    <Messages />
                    <SendInput />
                </div>
            ) : (
                <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                    <h1 className='text-4xl text-white font-bold'>Hi, {authUser?.username}</h1>
                    <h1 className='text-2xl text-white'>Let's start a conversation</h1>
                    <Link to="/register">{authUser==null ? (<button className="btn btn-secondary mt-2">Signup</button>):("")} </Link>
                </div>
            )}
        </>
    );
};

export default MessageContainer;
