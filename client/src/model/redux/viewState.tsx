import { AppActions } from "./store";
import { Dispatch } from "react";
import { updateSlideValue } from "./crowdDataSliderState";

export interface ViewState {
    activeView: string,
}

export const ViewActionTypes = {
    SET_VIEW: 'SET_VIEW',
}

export interface SetActiveViewAction {
    type: string,
    payload: string
}
function setActiveView (activeView: string): SetActiveViewAction {
    return {
        type: ViewActionTypes.SET_VIEW,
        payload: activeView
    }
}

export function setView(activeView: string) {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch(setActiveView(activeView));
    }
}

export type ViewActions = SetActiveViewAction;

export const ViewReducer = (
    state: ViewState = { activeView: 'current' }, 
    action: SetActiveViewAction
): ViewState => {
    switch (action.type) {
        case ViewActionTypes.SET_VIEW:
            return {activeView: action.payload};
        default:
            return state;
    }
}


