import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Home  from "./components/home/Home";

import './App.css';

function App() {
 return (
<BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
 )
}

export default App;
