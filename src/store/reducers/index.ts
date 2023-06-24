import {combineReducers} from "redux";
import {generalReducer} from "./generalReducer";

export const rootReducer = combineReducers({
    general: generalReducer
})

export type RootState = ReturnType<typeof rootReducer>