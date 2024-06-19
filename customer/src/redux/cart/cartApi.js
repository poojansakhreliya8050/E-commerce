import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000/api/v1/` }),
    endpoints: (builder) => ({
      getCart: builder.query({
        query: (userId) => `/cart/getCart/${userId}`,
      }),
    }),
  })


export const {useGetCartQuery} = cartApi;