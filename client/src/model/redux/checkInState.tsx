import { Store } from "redux";

export const CheckInActionTypes = {
    FETCH_CHECK_INS: 'FETCH_CHECK_INS'
}

export interface FetchCheckInsAction {
    type: string,
    payload: CheckIns
}

export type CheckInType = "Eating" | "Studying" | "Meeting" | "Other";

export interface CheckedInDetails {
    [key: string]: {
        name: string,
        type: CheckInType,
        date: Date
    }
}

export interface CheckIns {
    [userUid: string]: CheckedInDetails
}

export function setCheckIns(store: Store, checkIns: CheckIns) {
    store.dispatch({
        type: CheckInActionTypes.FETCH_CHECK_INS,
        payload: checkIns
    });
}

export const checkInReducer = (
    state: CheckIns = { }, 
    action: FetchCheckInsAction
): CheckIns => {
    switch (action.type) {
        case CheckInActionTypes.FETCH_CHECK_INS:
            return action.payload;
        default:
            return state;
    }
}


