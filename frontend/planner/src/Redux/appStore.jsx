import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
const appStore = configureStore({
    reducer:{
        addPlan:userSlice,
        
    }
});
export default appStore;