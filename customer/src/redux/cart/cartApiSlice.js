import { apiSlice } from '../app/apiSlice';
import { setCart } from './cartSlice';

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (userId) => ({
        url: `/cart/getCart/${userId}`,
        method: 'GET',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCart(data));
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      },
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: '/cart/addToCart',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCart(data));
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      },
    }),
    removeFromCart: builder.mutation({
      query: (data) => ({
        url: '/cart/removeFromCart',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCart(data));
        } catch (error) {
          console.error('Error removing from cart:', error);
        }
      },
    }),
    removeItemFromCart: builder.mutation({
      query: (data) => ({
        url: '/cart/removeItemFromCart',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCart(data));
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useRemoveItemFromCartMutation,
} = cartApi;
