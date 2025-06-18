import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket", "polling"],
  };

  // For production, use a separate backend service that supports WebSockets
  // You can deploy your backend to Railway, Render, Heroku, or similar services
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    (import.meta.env.DEV
      ? "http://localhost:5000"
      : "https://your-backend-service.onrender.com");

  console.log("Connecting to backend:", backendUrl);
  return io(backendUrl, options);
};
