import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket", "polling"],
  };

  // For production, use Railway backend URL
  // For development, use localhost
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    (import.meta.env.DEV
      ? "http://localhost:5000"
      : "https://real-time-code-editor-backend-production.up.railway.app");

  console.log("Connecting to backend:", backendUrl);
  console.log("Environment:", import.meta.env.MODE);
  console.log("Backend URL from env:", import.meta.env.VITE_BACKEND_URL);

  return io(backendUrl, options);
};
