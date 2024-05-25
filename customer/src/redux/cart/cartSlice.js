import {createSlice} from "@reduxjs/toolkit"

const initialState={
    cart:null,
}

const cartslice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        cartData: (state, action) => {
        state.cart=action.payload;
       },
    }
})

export const {cartData}=cartslice.actions;
export default cartslice.reducer