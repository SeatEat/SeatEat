const initialState = {daily: 0, weekly: 12};

export enum CrowdDataActionTypes {
    UPDATE_SLIDE_VALUE = "UPDATE_SLIDE_VALUE",
}

export interface ViewSlideState {
    [key: string]: number,
}

export interface SlideState extends ViewSlideState, ViewSlideState {}

// Change value of the state
export interface ChangeSlideValue {
    type: CrowdDataActionTypes.UPDATE_SLIDE_VALUE,
    payload: SlideState
}
export function updateSlideValue(activeView: string, newValue: number): ChangeSlideValue {
    return {
        type: CrowdDataActionTypes.UPDATE_SLIDE_VALUE,
        payload: {[activeView]: newValue},
    }
}

export type CrowdDataActions = ChangeSlideValue

export function crowdDataSliderReducer(
    state = initialState,
    action: CrowdDataActions
): SlideState {
    switch (action.type) {
        case CrowdDataActionTypes.UPDATE_SLIDE_VALUE:
            return {...state, ...action.payload};
        default:
            return state
    }
}