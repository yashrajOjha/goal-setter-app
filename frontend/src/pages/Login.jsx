import React from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { useState,useEffect  } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
function Login() {
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  })
  const {email,password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //destructre from state
  const {user, isLoading, isError, isSuccess, message}=useSelector((state)=>state.auth);
  
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset()) //set everything back to false

  },[user,isError,isSuccess,message,navigate,dispatch])

  const onChange= (e)=>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit =(e)=>{
    e.preventDefault()
    const userdata = {email,password}

    dispatch(login(userdata))
  }

  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
    <section className='heading'>
      <h1>
        <FaSignInAlt/> Login
      </h1>
      <p>Login with your credentials </p>
    </section>
    <section className='form'>
      <form onSubmit={onSubmit}>
      <div className="form-group">
        <input type="text" 
        className="form-control" 
        id='email' 
        name='email' 
        value={email} 
        placeholder="Enter your email"
        onChange={onChange}/>
      </div>
      <div className="form-group">
        <input type="password" 
        className="form-control" 
        id='password' 
        name='password' 
        value={password} 
        placeholder="Enter your password"
        onChange={onChange}/>
      </div>
      <div className="form-group">
        <button type='submit' className="btn btn-block">
          Login
        </button>
      </div>
      </form>
    </section>
    </>
  )
}

export default Login