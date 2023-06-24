import React, {Dispatch} from "react";
import {GeneralAction, TypesAction} from "../reducers/generalReducer";

export const setGeneral = (payload: HTMLDivElement) => {
    return (dispatch: Dispatch<GeneralAction>) => {
        dispatch({type: TypesAction.SET_REF, payload})
    }
}