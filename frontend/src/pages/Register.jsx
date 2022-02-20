import React from 'react'
import { useState,useEffect  } from 'react'
import {useSelector,useDispatch} from 'react-redux'
//useSelector selects something from the state, useDispatch calling async thunk function
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
/*React Toastify is a lightweight package based on react library that helps to add beautifully crafted custom notifications to react project. 
 The end-user gets a message as a popup alert in the browser*/
import {register, reset} from '../features/auth/authSlice'
import {FaUser} from 'react-icons/fa'
import Spinner from '../components/Spinner'

function Register() {
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
    conpassword:"",
  })
  const {name,email,password,password2} = formData

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

  },[user,isError,isSuccess,message,navigate,dispatch]) //fire off useEffect as soon as anything in the [] changes
  const onChange= (e)=>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit =(e)=>{
    e.preventDefault()
    if(password!==password2){
      toast.error('Passwords do not match')
    }else{
      const userdata = {
        name,email,password
      }
      dispatch(register(userdata))
    }
  }

  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
    <section className='heading'>
      <h1>
        <FaUser/> Register
      </h1>
      <p>Create an account</p>
    </section>
    <section className='form'>
      <form onSubmit={onSubmit}>
      <div className="form-group">
        <input type="text" 
        className="form-control" 
        id='name' 
        name='name' 
        value={name} 
        placeholder="Enter your name"
        onChange={onChange}/>
      </div>
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
        <input type="password" 
        className="form-control" 
        id='password2' 
        name='password2' 
        value={password2} 
        placeholder="Confirm the password"
        onChange={onChange}/>
      </div>
      <div className="form-group">
        <button type='submit' className="btn btn-block">
          Submit
        </button>
      </div>
      </form>
    </section>
    </>
  )
}

export default Register