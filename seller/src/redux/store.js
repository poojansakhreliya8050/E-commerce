import { configureStore } from "@reduxjs/toolkit"

import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './app/apiSlice'

import authReducer from "./user/authSlice"
import notificationReducer from "./notification/notificationSlice"
import sellerReducer from "./seller/sellerSlice"

const store = configureStore({
     reducer: {
          auth: authReducer,
          notification: notificationReducer,
          seller: sellerReducer,
          [apiSlice.reducerPath]: apiSlice.reducer,
     },
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(apiSlice.middleware), devTools: true
})

setupListeners(store.dispatch)

export default store;