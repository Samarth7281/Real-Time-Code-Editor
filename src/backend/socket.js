import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket", "polling"],
  };

  // For production, use a WebSocket service that works with Vercel
  // You can use services like:
  // - Socket.io Cloud (https://cloud.socket.io/)
  // - Pusher (https://pusher.com/)
  // - Or deploy your backend to Railway/Render/Heroku
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    (import.meta.env.DEV
      ? "http://localhost:5000"
      : "https://your-websocket-service.com");

  console.log("Connecting to backend:", backendUrl);
  return io(backendUrl, options);
};
