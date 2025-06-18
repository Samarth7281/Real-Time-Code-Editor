import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket", "polling"],
  };

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    (import.meta.env.DEV ? "http://localhost:5000" : window.location.origin);

  console.log("Connecting to backend:", backendUrl);
  return io(backendUrl, options);
};
