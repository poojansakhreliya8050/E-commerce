import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sellerData:null
};

const sellerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSellerData: (state, action) => {
      state.sellerData = action.payload;
    },
   
  },
});

export const { setSellerData } = sellerSlice.actions;

export default sellerSlice.reducer;
