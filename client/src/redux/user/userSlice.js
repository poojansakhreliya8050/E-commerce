import {createSlice} from "@reduxjs/toolkit"

const initialState={
    user:null,
    isUserLogIn: false,
}

const userslice=createSlice({
    name:"user",
    initialState,
    reducers:{
        userData: (state, action) => {
        state.user=action.payload;
       },
       userLogIn: (state, action) => {
         state.isUserLogIn = action.payload;
       }
    }
})

export const {userData, userLogIn}=userslice.actions;
export default userslice.reducer