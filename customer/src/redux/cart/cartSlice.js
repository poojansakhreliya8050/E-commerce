import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: null,
}

const cartslice = createSlice({
    name: "cartData",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        }
    }
})

export const { setCart } = cartslice.actions;
export default cartslice.reducer