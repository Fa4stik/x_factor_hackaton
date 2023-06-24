import React from "react";

export enum TypesAction {
    SET_REF = "SET_REF",
}

export interface GeneralAction {
    type: TypesAction.SET_REF,
    payload: HTMLDivElement
}

interface GeneralState {
    bg: HTMLDivElement | null
}

const initialState: GeneralState = {
    bg: null
}

export const generalReducer = (state = initialState, action: GeneralAction): GeneralState => {
    switch (action.type) {
        case TypesAction.SET_REF:
            return {
                ...state,
                bg: action.payload
            }
        default:
            return state
    }
}