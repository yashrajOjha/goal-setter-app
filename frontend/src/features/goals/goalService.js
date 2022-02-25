import axios from "axios";

const API_URL = '/api/goals/'

//create new goal 
const createGoal = async (goaldata, token)=>{
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL,goaldata,config) 

    return response.data
}
const getGoals = async (token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL,config)
    
    return response.data
}
//delete request 
const deleteGoal = async (goalId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + goalId, config)
  
    return response.data
}

const goalService = {
    createGoal,
    getGoals,
    deleteGoal,
}

export default goalService