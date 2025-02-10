import './SignUp.css'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { StoreContext } from '../../context/StoreContext'

const SignUp = () => {
  const {Url_Host}=useContext(StoreContext)
  const navigate = useNavigate()
  const Url_toregister = `${Url_Host}/user/register`
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setdata(data => ({ ...data, [name]: value }))
  }

  const onSingUp = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(Url_toregister, data)
      if (response.data.success) {
        alert('User registered successfully')
        navigate('/SignIn')
      } else {
        alert(response.data.message || "Registration failed")
      }
    } catch (error) {
      console.error("Registration Error:", error)
      alert(error.response?.data?.message || "Something went wrong. Please try again.")
    }
  }

  return (
    <div className='SignUp'>
      <form onSubmit={onSingUp}>
        <div className='SignIn_Box'>
          <FontAwesomeIcon icon={faTimes} className='close-button' onClick={() => navigate('/')} />

          <h1>The Fortune Hotel</h1>
          <h2>Welcome!</h2>
          <div className='SignIn_Inputs'>
            <label htmlFor='name'>Username:</label>
            <input type="text" name='name' id='name' value={data.name} onChange={onChangeHandler} placeholder="Enter your username" />
            <label htmlFor='email'>Email:</label>
            <input type="email" name='email' id='email' value={data.email} onChange={onChangeHandler} placeholder="Enter your email" />
            <label htmlFor='password'>Password:</label>
            <input type="password" name='password' id='password' value={data.password} onChange={onChangeHandler} placeholder="Enter your password" />
          </div>
          <button type='submit' className='SignIn_Button'>Sign up</button>
          <p>Already have an account? <Link to='/SignIn' className='SignUp_Link'>Sign in</Link></p>
        </div>
      </form>
    </div>
  )
}

export default SignUp
