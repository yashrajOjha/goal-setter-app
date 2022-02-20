//making the http request, and setting data into local storage
import axios from 'axios'

const API_URL = '/api/users/'

//register user functions
const register = async(userdata)=>{
    const response = await axios.post(API_URL,userdata) //make request and put response the variable 
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

//login
const login = async(userdata)=>{
    const response = await axios.post(API_URL+'login',userdata) //make request and put response the variable 
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

const logout = () =>{
    localStorage.removeItem('user')
}
const authService = {
    register,logout,login
}
export default authService