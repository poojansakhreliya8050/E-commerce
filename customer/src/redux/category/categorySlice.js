import {createSlice} from "@reduxjs/toolkit"

const initialState={
    categories:[],
}

const categoryslice=createSlice({
    name:"category",
    initialState,
    reducers:{
        categoryData: (state, action) => {
        state.categories=action.payload;
       },
       addNewCategory: (state, action) => {
        //push category if not already present
        if(!state.categories.find(category=>category._id===action.payload._id))    
                state.categories.push(action.payload);
       }
    }
})

export const {categoryData,addNewCategory}=categoryslice.actions;
export default categoryslice.reducer