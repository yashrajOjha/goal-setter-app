//users are not resources
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
/*Rather than execute some logic now, we can write a function body or code that can be used to perform the work later.
For Redux specifically, "thunks" are a pattern of writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.
*/
import authService from './authService'

//getting user from local storage
const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user: (user)?user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}
//registering the user
export const register = createAsyncThunk('auth/register', async(user, thunkAPI)=>{
    //passing in user data from register function
    try{
        return await authService.register(user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message) //reject and send error message as payload
    }
})

//login
export const login = createAsyncThunk('auth/login', async(user, thunkAPI)=>{
    //passing in user data from register function
    try{
        return await authService.login (user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message) //reject and send error message as payload
    }
})

export const logout = createAsyncThunk('auth/logout',async ()=>{
    await authService.logout()
})
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        //resetting back to the original state
        reset:(state)=>{
             state.isLoading=false
             state.isError=false
             state.isSuccess=false
             state.message=''
        }
    }, //async thukn function is for extra reducer
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            //when register action is pending what should we do, set loading to true
            state.isLoading=true
        })
        .addCase(register.fulfilled,(state,action)=>{
            //when register action is fulfilled, we get back state and action which is the returned data
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true //error because the case is rejected
            state.message = action.message
            state.user =null
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user=null
        })
        .addCase(login.pending,(state)=>{
            //when login action is pending what should we do, set loading to true
            state.isLoading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            //when login action is fulfilled, we get back state and action which is the returned data
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true //error because the case is rejected
            state.message = action.message
            state.user =null
        })
    }
})

export const {reset} = authSlice.actions //bring it to components where we want to use it 
export default authSlice.reducer