import { configureStore } from "@reduxjs/toolkit";
import counterReducer, { CounterState } from "./modules/counter/counterSlice"

export interface ApplicationState {
    counter: CounterState
}

export default configureStore({
    reducer: {
        counter: counterReducer
    }
})