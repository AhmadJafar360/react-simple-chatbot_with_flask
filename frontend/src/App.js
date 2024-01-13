import "./Editing/Style.css";
import Dashboard from "./pages/Dasboard";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/LoginPages";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/regist" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
