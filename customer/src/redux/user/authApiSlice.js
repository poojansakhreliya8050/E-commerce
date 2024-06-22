import {setCredentials} from './authSlice';
import { apiSlice } from "../app/apiSlice"

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/user/loginUser',
        method: 'POST',
        body: credentials,
      }),
      onfulfilled: (data) => {
        setCredentials(data);
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/user/createUser',
        method: 'POST',
        body: credentials,
      }),
      onfulfilled: (data) => {
        setCredentials(data);
      },
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: '/user/refresh_token',
        method: 'POST',
      }),
    }),
  }),
});




export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation } = authApi;


