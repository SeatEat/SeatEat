import store, { AppActions, AppState } from "./store";
import { Dispatch } from "react";
import { addCheckIn, removeCheckIn, PersonCheckIn, addCheckInListener } from "../check-in-model";
import { CheckInActivityIDs } from "../../data/check-in-activities";
import { FirebaseError } from "firebase";
import ErrorTypes from "../errorTypes";
import { REHYDRATE } from "redux-persist";

export enum CheckInActionTypes {
    SET_CHECK_INS = 'SET_CHECK_INS',
    SET_USER_CHECK_IN_LOADING = 'SET_USER_CHECK_IN_LOADING',
    SET_USER_CHECK_IN_DATA = 'SET_USER_CHECK_IN_DATA',
    REMOVE_USER_CHECK_IN_DATA = 'REMOVE_USER_CHECK_IN_DATA',
    ADD_USER_CHECK_IN_ERROR = 'ADD_USER_CHECK_IN_ERROR',
}

interface CheckInUser {
    docID: string | null
    chapterName: string | null,
    loading: boolean,
    userCheckedIn: boolean,
}

export interface CheckInState {
    userCheckedInError: number | null,
    checkInUser: CheckInUser
    peopleCheckIn: PersonCheckIn[]
}

const initCheckInUserState: CheckInUser = {
    docID: null,
    chapterName: null,
    loading: false,
    userCheckedIn: false,
}

const initCheckInState: CheckInState = {
    userCheckedInError: null,
    checkInUser: initCheckInUserState,
    peopleCheckIn: []
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
    return {
        type: CheckInActionTypes.REMOVE_USER_CHECK_IN_DATA,
    }
}

export interface AddUserCheckInErrorAction {
    type: CheckInActionTypes.ADD_USER_CHECK_IN_ERROR,
    payload: number,
}
export function addUserCheckInError(errorType: number): AddUserCheckInErrorAction {
    return {
        type: CheckInActionTypes.ADD_USER_CHECK_IN_ERROR,
        payload: errorType
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
            }).catch((response: FirebaseError) => {
                let errorCode = null;
                switch (response.code) {
                    case "INTERNAL":
                        errorCode = ErrorTypes.INTERNAL_SERVER_ERROR;
                        break;
                    case "UNREGISTERED":
                        errorCode = ErrorTypes.API_NOT_FOUND;
                        break;
                    default:
                        errorCode = ErrorTypes.UNKNOWN;
                        break;
                }
                dispatch(addUserCheckInError(errorCode));
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

export interface RehydrateCheckInStateAction {
    type: typeof REHYDRATE,
    payload: {
        checkInUser: CheckInUser
    }
}

export type CheckInActions = 
    SetCheckInsAction | 
    SetUserCheckInLoadingAction |
    SetUserCheckInDataAction |
    RemoveUserCheckInDataAction |
    AddUserCheckInErrorAction |
    RehydrateCheckInStateAction

export const checkInReducer = (
    state: CheckInState = initCheckInState, 
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
                },
                userCheckedInError: null
            };
        case CheckInActionTypes.SET_USER_CHECK_IN_DATA:
            return {
                ...state,
                checkInUser: {
                    docID: action.payload.docID,
                    chapterName: action.payload.chapterName,
                    userCheckedIn: true,
                    loading: false,
                }
            };
        case CheckInActionTypes.REMOVE_USER_CHECK_IN_DATA:
            return {
                ...state,
                checkInUser: initCheckInUserState,
            };
        case CheckInActionTypes.ADD_USER_CHECK_IN_ERROR:
            return {
                ...state,
                checkInUser: initCheckInUserState,
                userCheckedInError: action.payload
            };
        case REHYDRATE: 
            if(!action.payload) {
                return state;
            }
            return {
                ...state,
                checkInUser: {
                    ...action.payload.checkInUser,
                    loading: false
                }
            };
        default:
            return state;
    }
}


