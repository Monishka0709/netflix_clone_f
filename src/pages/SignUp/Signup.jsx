import React, { use, useState } from 'react'
import './Signup.css'
import logo from '../../assets/logo.png'
import { signup} from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toast';

const Signup = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const user_register = async (e) => {
      e.preventDefault();
      const user = await signup(name, email, password);
      if(!user) {
        toast.error("Registration failed. Please try again.");
        return;
      }
      toast.success("Registration Successful! Please Login.");
        navigate('/login');
        
      
    }
  return (
    <div className="signup-container">
      <div className="signup-heading">
      {/* <img src={logo} alt="Netflix Logo" className="signup-logo" /> */}
      </div>
      <div className="signup-content">
      <div className="signup-form">
        <h1>
          Sign Up   
        </h1>
        <form action="">
          <input type="name" className='name-input' placeholder='Your Name' value={name} onChange={(e)=> setName(e.target.value)} />
          <input type="phone" className='phone-input' placeholder='Phone number' value={phone} onChange={(e)=> setPhone(e.target.value)} />
          <input type="email" className='email-input' placeholder='Email or phone number' value={email} onChange={(e)=> setEmail(e.target.value)} />
          <input type="password" className='password-input' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} />
          
          <button onClick={user_register} className='btn btn-primary signup-btn'>Sign Up</button>
        </form>

        <div className="divider">
          <hr />
          {/* <span>OR</span> */}
          {/* <hr /> */}
        </div>
        <p className="already-member">
          Already a member? <a href="/login">Login</a></p>
        {/* <button className='create-account'>Login</button> */}

        <p className="recaptcha-info">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
      </div>
      
    </div>
    </div>
  )
}

export default Signup
