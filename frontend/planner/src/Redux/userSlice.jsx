import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addOpen: false,
    refre:1
};
const userSlice=createSlice({
    name:"addPlan",
    initialState,

    reducers:{
        openAddPlan:(state,action)=>{
            state.addOpen=action.payload;

        },
        closeAddPlan:(state)=>{
            state.addOpen=false;

        },
        refresh:(state,action)=>{
            state.refre=action.payload+1
        }
    }

})

export const {openAddPlan,closeAddPlan,refresh}=userSlice.actions;
export default userSlice.reducer;