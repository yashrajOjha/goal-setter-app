import React from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import GoalForm from '../components/GoalForm'
function Dashboard() {
  const navigate = useNavigate()
  const {user} = useSelector((state)=> state.auth)
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[user,navigate])
  return (
    <>
    <section className='heading'>
      <h1>Welcome {user && user.name}</h1>
      <p>This is your goals dashboard, set your goals here.</p>
    </section>
    <GoalForm/>
    </>
  )
}

export default Dashboard