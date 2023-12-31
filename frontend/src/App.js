import LoginPage from "./components/auth/LoginPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./components/auth/SignupPage";
import HomePage from "./components/home/HomePage";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./components/auth/VerifyEmail";
import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import ForgotPassword from "./components/auth/ForgotPassword";
import UpdatePW from "./components/auth/UpdatePW";
import jwtDecode from "jwt-decode";
import Landing from "./components/Landing/Landing";
import Calculator from "./components/Calculator/Calculator";
import Compare from "./components/Compare/Compare";
import ContactUs from "./components/ContactUs/ContactUs";
import Footer from "./components/MainPage/Footer";
import Navbar from "./components/MainPage/Navbar";
import Offset from "./components/Offset/Offset";

function App() {
  const [signupData, setSignupData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );
  const setData = async () => {
    if (token) {
      const decodedToken = await jwtDecode(token);
      if (decodedToken) {
        setUserData(decodedToken);
      }
    }
  };
  useEffect(() => {
    setData();
    // console.log(userData)
  }, [token]);

  return (
    <>
      <div className="App">
        <Toaster />
        <BrowserRouter>
          <AuthContext.Provider
            value={{
              signupData,
              setSignupData,
              userData,
              setUserData,
              token,
              setToken,
            }}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:id" element={<UpdatePW />} />
              <Route path="/Landing" element={<Landing />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/HomePage" element={<Landing />} />
              <Route path="/offset" element={<Offset />} />
            </Routes>
          </AuthContext.Provider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
