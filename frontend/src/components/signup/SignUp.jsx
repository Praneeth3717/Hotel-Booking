import './SignUp.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@tanstack/react-query';
import { getRegistered } from '../../api/Api';

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutate: onSingUp, isLoading, isError, error } = useMutation({
    mutationFn: ()=>getRegistered(data),
    onSuccess: (data) => {
      if (data.success) {
        alert('User registered successfully');
        navigate('/SignIn');
      } else {
        alert(data.message || 'Registration failed');
      }
    },
    onError: (error) => {
      console.error('Registration Error:', error);
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSingUp(data);
  };

  return (
    <div className="SignUp">
      <form onSubmit={handleSubmit}>
        <div className="SignIn_Box">
          <FontAwesomeIcon icon={faTimes} className="close-button" onClick={() => navigate('/')} />
          <h1>The Fortune Hotel</h1>
          <h2>Welcome!</h2>
          <div className="SignIn_Inputs">
            <label htmlFor="name">Username:</label>
            <input type="text" name="name" id="name" value={data.name} onChange={onChangeHandler} placeholder="Enter your username"/>
            
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" value={data.email} onChange={onChangeHandler} placeholder="Enter your email"/>
            
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" value={data.password} onChange={onChangeHandler} placeholder="Enter your password"/>
          </div>
          <button type="submit" className="SignIn_Button" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
          {isError && <div className="error-message">{error.message}</div>}
          <p>
            Already have an account? <Link to="/SignIn" className="SignUp_Link">Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;