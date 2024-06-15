import {createSlice} from "@reduxjs/toolkit"

const initialState={
    categories:null,
}

const categoryslice=createSlice({
    name:"category",
    initialState,
    reducers:{
        categoryData: (state, action) => {
        state.categories=action.payload;
       },
    }
})

export const {categoryData}=categoryslice.actions;
export default categoryslice.reducer