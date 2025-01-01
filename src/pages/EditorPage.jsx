import React, { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../backend/socket";
import { ACTIONS } from "../backend/actions";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { roomId } = useParams();
  const [clients, setClients] = useState([]);

  const handleError = (e) => {
    console.log("Socket Error occured", e);
    toast.error("Socket connection failed!");
    reactNavigator("/");
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room Id copied to clipboard");
    } catch (error) {
      console.log(error);
    }
  };

  const leaveRoom = () => {
    reactNavigator("/");
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          // Display toast only for others, not for the joining user
          if (username !== location.state.username) {
            toast.success(`${username} has joined the room`);
          } else {
            toast.success("You have joined the room");
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketIds, username }) => {
        toast.success(`${username} has left the room`);
        console.log("Disconnected socketIds:", socketIds);

        setClients((prevClients) => {
          const updatedClients = prevClients.filter(
            (client) => !socketIds.includes(client.socketId) // Filter out all matching socketIds
          );
          console.log("Updated Clients:", updatedClients);
          return updatedClients;
        });
      });
    };
    init();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="#wrapper grid grid-cols-[230px_1fr] h-screen">
      <div className="#aside bg-neutral-900 p-4 text-white flex flex-col">
        <div className="#asideInner flex-1">
          <div className="#image">
            <img src="/logo.png" alt="" className="w-24 h-20 mb-6" />
          </div>
          <h3 className="font-bold">Connected</h3>
          <div className="#clientsList flex flex-wrap gap-5 items-center mt-2">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button
          className="p-2 bg-neutral-800 hover:bg-neutral-700 focus:ring-2  text-white rounded font-bold"
          onClick={copyRoomId}
        >
          copy ROOM ID
        </button>
        <button
          className="p-2 bg-red-500 mt-4 rounded font-bold"
          onClick={leaveRoom}
        >
          Leave
        </button>
      </div>

      <div className="#editor">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
