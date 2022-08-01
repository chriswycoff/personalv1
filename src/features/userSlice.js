import { createSlice } from '@reduxjs/toolkit'


// const [userName, setUserName] = useState(null)


const initialState = {
    userName: null,
    userEmail: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUser: (state, action) =>{
            console.log("user",action.payload.userName,action.payload.userEmail)
            state.userName = action.payload.userName
            state.userEmail = action.payload.userEmail
        },
        setUserLogOutState: (state) => {
            state.userName = null
            state.userEmail = null
        }
    }
});

export const {setActiveUser, setUserLogOutState } = userSlice.actions

export const selectUserName = state => state.user.userName
export const selectUserEmail = state => state.user.userEmail

export default userSlice.reducer