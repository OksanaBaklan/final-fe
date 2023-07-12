/** @format */

import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppBackground from "./components/AppBackground/AppBackground";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState("")

  return (
    <div className="App">
      <AppBackground>
        <Routes>
          <Route path="/login" element={<LoginPage  setAuthenticated={setAuthenticated}
              setUserName={setUserName}
              setUserId={setUserId}
              authenticated={authenticated}
              setAvatar = {setAvatar}/>} />
              <Route
                  path="/register"
                  element={authenticated ? <Navigate to="/" /> : <RegisterPage />}
                />
                              <Route
                  path="/verify/:verificationToken"
                  element={<VerifyPage/>}
                />
        </Routes>
      </AppBackground>
    </div>
  );
}

export default App;
