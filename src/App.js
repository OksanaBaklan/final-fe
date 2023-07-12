/** @format */

import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppBackground from "./components/AppBackground/AppBackground";
import LoginPage from "./pages/LoginPage/LoginPage";
import Currency from "./components/Currency/Currency";

function App() {
   return (
      <div className="App">
         <AppBackground>
            <h1>Money Minder</h1>
            <Routes>
               <Route path="/login" element={<LoginPage />} />
               <Route path="/currency" element={<Currency />} />

            </Routes>
         </AppBackground>
      </div>
   );
}

export default App;
