import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const Url_toverify = "https://hotel-booking-backend-gne4.onrender.com/user/verifyUser";
  
  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(Url_toverify, data);
      if (response.data.success) {
        alert("User logged in");
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        navigate('/');
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className='SignIn'>
      <form onSubmit={onLogin}>
        <div className='SignIn_Box'>
          <button className="close-btn" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h1>The Fortune Hotel</h1>
          <h2>Welcome Back!</h2>
          <div className='SignIn_Inputs'>
            <label htmlFor='email'>Email:</label>
            <input name='email' value={data.email} onChange={onChangeHandler} type="text" id="email" placeholder="Enter your email" />
            <label htmlFor='password'>Password:</label>
            <input name='password' value={data.password} id="password" onChange={onChangeHandler} type="password" placeholder="Enter your password" />
          </div>
          <button type='submit' className='SignIn_Button'>Login</button>
          <p>Don’t have an account? <Link to='/SignUp' className='SignUp_Link'>Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
