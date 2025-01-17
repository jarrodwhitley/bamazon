import { createSlice } from '@reduxjs/toolkit'

const storedUser = JSON.parse(localStorage.getItem('user'))
const intialUserState = storedUser ? storedUser : { isLoggedIn: false, user: null }

const authSlice = createSlice({
    name: 'user',
    initialState: intialUserState,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
    },
})

export const { setUser, setIsLoggedIn, setIsLoading } = authSlice.actions
export default authSlice.reducer