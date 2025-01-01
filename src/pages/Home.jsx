import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {v4 as uuidV4} from 'uuid'

const Home = () => {

  const navigate = useNavigate()

  const [roomId,setRoomId] = useState()
  const [username,setUsername] = useState()

  const createNewRoom = (e) => {
    e.preventDefault()
    const id = uuidV4()
    setRoomId(id)
    toast.success("Created new room")
  }

  const joinRoom = () => {
    if(!roomId || !username){
      toast.error("Username and ROOM ID required")
      return;
    }

    navigate(`editor/${roomId}`,{
      state: {
        username
      }
    })
  }

  const handleEnterClick = (e) => {
    if(e.code === 'Enter')
      joinRoom()
  }

  return (
    <div className="flex items-center justify-center text-gray-200 h-screen">
      <div className="bg-neutral-900 p-5 rounded-2xl w-[400px] max-w-[90%]">
        <img src="/logo.png" alt="code-sync-logo" className="w-24 h-20 mb-6" />
        <h4 className="mb-5 text-xl font-semibold text-gray-100 tracking-wide">
          Paste invitation ROOM ID
        </h4>

        <div className="flex flex-col">
          <input
            className="p-2 rounded-md outline-none mb-4 bg-neutral-600 text-gray-200 font-bold text-base"
            type="text"
            placeholder="ROOM ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleEnterClick}
          />
          <input
            className="p-2 rounded-md outline-none mb-4 bg-neutral-600 text-gray-200 font-bold text-base"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleEnterClick}
          />
          <button className="bg-neutral-600 border-none p-2 transition-all duration-300 ease-in-out hover:bg-gray-700 w-24 ml-auto rounded-md text-gray-200" onClick={joinRoom}>
            Join
          </button>
          <span className="text-gray-400 ml-auto mr-auto mt-2">
            If you don’t have an invite then create &nbsp;
            <a href="" className="text-blue-400 hover:underline" onClick={createNewRoom}>
              new room
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
