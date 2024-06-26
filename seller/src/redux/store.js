import { configureStore } from "@reduxjs/toolkit"

import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './app/apiSlice'

import authReducer from "./user/authSlice"
import notificationReducer from "./notification/notificationSlice"

const store = configureStore({
     reducer: {
          auth: authReducer,
          notification: notificationReducer,
          [apiSlice.reducerPath]: apiSlice.reducer,
     },
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(apiSlice.middleware), devTools: true
})

setupListeners(store.dispatch)

export default store;