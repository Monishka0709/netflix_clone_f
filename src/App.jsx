import React, { useState, useEffect, use } from 'react'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import './App.css'
import offline from './assets/offline.png'
import Signup from './pages/SignUp/Signup.jsx'
import Profile from './pages/Profile/Profile.jsx'
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'
import { auth } from './firebase.js'


const App = () => {
  // const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {

    onAuthStateChanged(auth, async(user) => {
      if (user) {
        const uid = user.uid;
        console.log("User logged in");

      } else {
        // User is signed out
        console.log("User is signed out");
      }
    });
  }, []);

  return (
    <div>
      {
        !isOnline ? 
        <div className="offline">
          <div className="offline-content">

            <img src={offline} alt="" />
            <h3>You are offline. <br/>Please check your internet connection.</h3>
          </div>
          
          
        </div>
        :
        <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
      }
      

      
    </div>
  );
};

export default App;
