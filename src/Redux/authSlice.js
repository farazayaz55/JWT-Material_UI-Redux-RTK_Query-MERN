import { createSlice } from '@reduxjs/toolkit'
const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    update:(state,action)=>{
      state.user.accesstoken=action.payload
    }
  }
})

export default authSlice.reducer
export const {update,reset}= authSlice.actions