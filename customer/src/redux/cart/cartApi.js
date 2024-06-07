import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL}/api/v2/` }),
    endpoints: (builder) => ({

      getCart: builder.query({
        query: (userId) => `/cart/getCart/${userId}`,
      }),
    }),
  })


export const {useGetCartQuery} = cartApi;