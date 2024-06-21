import {
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../app/apiSlice"

const cartAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = cartAdapter.getInitialState()

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      getCart: builder.query({
          query: () => '/cart/getCart/65f47716c1f778c761717e1b',
          validateStatus: (response, result) => {
              return response.status === 200 && !result.isError
          },
          transformResponse: responseData => {
            const { data } = responseData
            return data
          }
      }),
  }),
})

export const {
  useGetCartQuery,
} = cartApiSlice

// returns the query result object
export const selectCartResult = cartApiSlice.endpoints.getCart.select()

// creates memoized selector
const selectcartData = createSelector(
  selectCartResult,
  cartResult => cartResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring

