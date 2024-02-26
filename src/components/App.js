import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../Pages/Home";
import Landing from "../Pages/Landing";
import AboutUs from "../Pages/AboutUs";
import Resources from "../Pages/Resources";
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import { useState } from "react";

function App() {
  const [isUser, setUser] = useState(localStorage.getItem('accessToken'));
  console.log(isUser + "Loda hai zaid");
  return (
    <Router>
      <GoogleOAuthProvider clientId="69380516169-d1uig3127bt64u4rc8bq4t2fufum391a.apps.googleusercontent.com"> {/* Wrap the entire application with GoogleOAuthProvider */}
        <Header isUser = {isUser} setUser = {setUser}/>
        <Routes>
          <Route path="/" element={isUser ? <Landing /> : <Home setUser={setUser} user={isUser}/>} />
          {/* <Route path="/landing" element={<Landing />} /> */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
        <Footer />
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
