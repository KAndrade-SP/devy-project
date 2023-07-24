import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from './pages/Login/index';
import { Home } from "./pages/Home";

import './styles/global.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}
