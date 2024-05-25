import { configureStore } from "@reduxjs/toolkit"
import userslice from "./user/userSlice"
import cartslice from "./cart/cartSlice"
 const store=configureStore({
    reducer:{
         userData: userslice,
         cartData: cartslice
    }
})

export default store;