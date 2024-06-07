import { configureStore } from "@reduxjs/toolkit"
import userslice from "./user/userSlice"
import cartslice from "./cart/cartSlice"

import { setupListeners } from '@reduxjs/toolkit/query'
import { cartApi } from "./cart/cartApi"
 const store=configureStore({
    reducer:{
         userData: userslice,
         cartData: cartslice,
          [cartApi.reducerPath]: cartApi.reducer,
    },
     middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(cartApi.middleware),
})

setupListeners(store.dispatch)

export default store;