import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@tanstack/react-query';
import { getLoggedIn } from '../../api/Api';

const SignIn = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutate: onLogin, isLoading, isError, error } = useMutation({
    mutationFn: () => getLoggedIn(data),
    onSuccess: (response) => {
      if (response.success) {
        alert('User logged in');
        const token = response.token;
        setToken(token);
        localStorage.setItem('token', token);
        navigate(`/`);
      }
    },
    onError: (error) => {
      console.error('Error during login:', error);
      alert(error.message || 'An error occurred. Please try again.');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <div className="SignIn">
      <form onSubmit={handleSubmit}>
        <div className="SignIn_Box">
          <button className="close-btn" onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h1>The Fortune Hotel</h1>
          <h2>Welcome Back!</h2>
          <div className="SignIn_Inputs">
            <label htmlFor="email">Email:</label>
            <input name="email" value={data.email} onChange={onChangeHandler} type="text" id="email" placeholder="Enter your email"/>

            <label htmlFor="password">Password:</label>
            <input name="password" value={data.password} id="password" onChange={onChangeHandler} type="password" placeholder="Enter your password"/>
            
          </div>
          <button type="submit" className="SignIn_Button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          {isError && <div className="error-message">{error.message}</div>}
          <p>
            Don’t have an account? <Link to="/SignUp" className="SignUp_Link">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
