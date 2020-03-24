import { Store } from "redux";
import store, { AppActions, AppState } from "./store";
import { Dispatch } from "react";
import { addCheckIn, removeCheckIn, PersonCheckIn } from "../check-in-model";
import { CheckInActivityIDs } from "../../data/check-in-activities";

const userCheckInDocIDLocalStorageName = 'userCheckInDocID'

export enum CheckInActionTypes {
    SET_CHECK_INS = 'SET_CHECK_INS',
    SET_USER_CHECK_IN_LOADING = 'SET_USER_CHECK_IN_LOADING',
    SET_USER_CHECK_IN_DATA = 'SET_USER_CHECK_IN_DATA',
    REMOVE_USER_CHECK_IN_DATA = 'REMOVE_USER_CHECK_IN_DATA',
}

export interface CheckInState {
    checkInUser: {
        docID: string | null
        loading: boolean,
        userCheckedIn: boolean
    }
    peopleCheckIn: PersonCheckIn[]
}

function loadInitCheckInState(): CheckInState {
    const userDocID = localStorage.getItem(userCheckInDocIDLocalStorageName);
    return {
        checkInUser: {
            docID: userDocID,
            loading: false,
            userCheckedIn: userDocID !== null
        },
        peopleCheckIn: []
    }
}


export interface SetUserCheckInLoadingAction {
    type: CheckInActionTypes.SET_USER_CHECK_IN_LOADING,
    payload: boolean
}
export function setUserCheckInLoading(loading: boolean): SetUserCheckInLoadingAction {
    return {
        type: CheckInActionTypes.SET_USER_CHECK_IN_LOADING,
        payload: loading
    }
}

export interface SetUserCheckInDataAction {
    type: CheckInActionTypes.SET_USER_CHECK_IN_DATA,
    payload: string
}
export function setUserCheckInData(docID: string): SetUserCheckInDataAction {

    //Store the doc ID in local storage
    localStorage.setItem(userCheckInDocIDLocalStorageName, docID);

    return {
        type: CheckInActionTypes.SET_USER_CHECK_IN_DATA,
        payload: docID
    }
} 

export interface RemoveUserCheckInDataAction {
    type: CheckInActionTypes.REMOVE_USER_CHECK_IN_DATA
}
export function removeUserCheckInData(): RemoveUserCheckInDataAction {
    //Remove doc ID from local stroage
    localStorage.removeItem(userCheckInDocIDLocalStorageName);
    return {
        type: CheckInActionTypes.REMOVE_USER_CHECK_IN_DATA,
    }
} 


export function requestUserCheckIn(name: string, type: CheckInActivityIDs) {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch(setUserCheckInLoading(true));
        addCheckIn(name, type).then((doc) => {
            dispatch(setUserCheckInData(doc.id));
        }).catch(() => {
            /** TODO */
        })
    }
}


export function requestUserCheckOut() {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        let docID = getState().checkInState.checkInUser.docID;
        if (docID) {
            removeCheckIn(docID);
            dispatch(removeUserCheckInData());
        }
    }
}


export interface SetCheckInsAction {
    type: CheckInActionTypes.SET_CHECK_INS,
    payload: PersonCheckIn[]
}
export function setCheckIns(checkIns: PersonCheckIn[]): SetCheckInsAction {
    return {
        type: CheckInActionTypes.SET_CHECK_INS,
        payload: checkIns
    }
}

export type CheckInActions = 
    SetCheckInsAction | 
    SetUserCheckInLoadingAction |
    SetUserCheckInDataAction |
    RemoveUserCheckInDataAction

export const checkInReducer = (
    state: CheckInState = loadInitCheckInState(), 
    action: CheckInActions
): CheckInState => {
    switch (action.type) {
        case CheckInActionTypes.SET_CHECK_INS:
            return {
                ...state,
                peopleCheckIn: action.payload
            };
        case CheckInActionTypes.SET_USER_CHECK_IN_LOADING:
            return {
                ...state,
                checkInUser: {
                    ...state.checkInUser,
                    loading: action.payload
                }
            };
        case CheckInActionTypes.SET_USER_CHECK_IN_DATA:
            return {
                ...state,
                checkInUser: {
                    docID: action.payload,
                    userCheckedIn: true,
                    loading: false
                }
            };
        case CheckInActionTypes.REMOVE_USER_CHECK_IN_DATA:
            return {
                ...state,
                checkInUser: {
                    ...state.checkInUser,
                    docID: null,
                    userCheckedIn: false
                }
            };
        default:
            return state;
    }
}


