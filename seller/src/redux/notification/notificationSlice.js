import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 order:0
};

const notificationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    recivedOrder: (state, action) => {
      state.order++;
    },
    clearOrder: (state) => {
      state.order = 0;
    },
  },
});

export const { recivedOrder, clearOrder } = notificationSlice.actions;

export default notificationSlice.reducer;
