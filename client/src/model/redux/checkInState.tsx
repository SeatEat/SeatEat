import { Store } from "redux";
import store, { AppActions, AppState } from "./store";
import { Dispatch } from "react";
import { addCheckIn, removeCheckIn, PersonCheckIn, addCheckInListener } from "../check-in-model";
import { CheckInActivityIDs } from "../../data/check-in-activities";
import { ThunkAction } from "redux-thunk";

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
        chapterName: string | null,
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
            chapterName: null,
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
    payload: {
        docID: string,
        chapterName: string
    }
}
export function setUserCheckInData(docID: string, chapterName: string): SetUserCheckInDataAction {

    //Store the doc ID in local storage
    localStorage.setItem(userCheckInDocIDLocalStorageName, docID);

    return {
        type: CheckInActionTypes.SET_USER_CHECK_IN_DATA,
        payload: {
            docID: docID,
            chapterName: chapterName
        }
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
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {

        // Begin loading
        dispatch(setUserCheckInLoading(true));

        // Get active chapter
        const chapterName = getState().estimationState.chapterHall?.name;
        
        if (chapterName) {
            addCheckIn(name, type, chapterName).then((doc) => {
                dispatch(setUserCheckInData(doc.id, chapterName));
            }).catch(() => {
                /** TODO */
            });
        }
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


let checkInUnsubscribe: Function;
export function requestCheckInListener() {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        // We need to unsubscribe to the last checkInListener
        if (checkInUnsubscribe) {
            checkInUnsubscribe();
        }
        const activeChapterName = getState().estimationState.chapterHall?.name;

        if (activeChapterName) {
            checkInUnsubscribe = addCheckInListener(activeChapterName, (checkIns) => {
                dispatch(setCheckIns(checkIns));
            });
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
                    docID: action.payload.docID,
                    chapterName: action.payload.chapterName,
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


