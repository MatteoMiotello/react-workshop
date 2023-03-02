import { Action, CaseReducer, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDeferredValue } from "react";
import { ApplicationState } from "../../store";

export interface CounterState {
    value: number
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state: CounterState) => {
            state.value += 1
        },
        decrement: (state: CounterState) => {
            state.value -= 1
        },
        setAmount: ( state: CounterState, action: PayloadAction<number> ) => {
            state.value = action.payload
        }
    }
})

const selectV = (state: ApplicationState )=> state.counter.value

export const selectValue = createSelector( [ selectV ], ( value ) => value  ) 

export const { increment, decrement, setAmount } = counterSlice.actions
export default counterSlice.reducer