import { configureStore } from "@reduxjs/toolkit"
import userslice from "./user/userSlice"
import cartslice from "./cart/cartSlice"
import categorySlice from "./category/categorySlice"

import { setupListeners } from '@reduxjs/toolkit/query'
import {apiSlice} from './app/apiSlice'

 const store=configureStore({
    reducer:{
         userData: userslice,
         cartData: cartslice,
         categoryData: categorySlice,
          [apiSlice.reducerPath]: apiSlice.reducer,
    },
     middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(apiSlice.middleware), devTools: true
})

setupListeners(store.dispatch)

export default store;