import { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login } from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toast';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const user_auth = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if(!user) {
      toast.error("Invalid email or password");
      return;
    }
    toast.success("Login Successful! Redirecting to Home...", {position: "top-right"});
    setTimeout(() => {
      navigate('/');
    }, 3000);

  }
  const signupRedirect = () => {
    navigate('/signup');
  }


  return (
    <div className="login-container">
      <div className="login-heading">
      <img src={logo} alt="Netflix Logo" className="login-logo" />
      </div>
      <ToastContainer />
      <div className="login-content">
      <div className="login-form">
        <h1>
          Sign In
        </h1>
        <form action="">
          <input type="email" className='email-input' placeholder='Email or phone number' value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" className='password-input' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <div className="login-options">
          <div className="forgot"><a href="">Forgot password?</a></div>
          <div className="helper-login">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          </div>
          <button onClick={user_auth} className='btn btn-primary login-btn'>Sign In</button>
        </form>

        <div className="divider">
          <hr />
          <span>OR</span>
          <hr />
        </div>
        <button onClick={signupRedirect} className='create-account'>Create an Account</button>

        <p className="recaptcha-info">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
      </div>
      
    </div>
    </div>
  )
}

export default Login
