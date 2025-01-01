import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="">
      <Toaster
        position="top-right"
        toastOptions={{ success: { iconTheme: { primary: "#171717" } } }} 
      ></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/editor/:roomId" element={<EditorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
