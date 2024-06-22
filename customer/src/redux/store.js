import { configureStore } from "@reduxjs/toolkit"
import categorySlice from "./category/categorySlice"

import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './app/apiSlice'

import authReducer from "./user/authSlice"
import cartReducer from "./cart/cartSlice"

const store = configureStore({
     reducer: {
          auth: authReducer,
          cartData: cartReducer,
          categoryData: categorySlice,
          [apiSlice.reducerPath]: apiSlice.reducer,
     },
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(apiSlice.middleware), devTools: true
})

setupListeners(store.dispatch)

export default store;