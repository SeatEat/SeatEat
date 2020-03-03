const initialState = 0;

export enum CrowdDataActionTypes {
    UPDATE_SLIDE_VALUE = "UPDATE_SLIDE_VALUE",
}

// Change value of the state
export interface ChangeSlideValue {
    type: CrowdDataActionTypes.UPDATE_SLIDE_VALUE,
    payload: number
}
export function updateSlideValue(newValue: number): ChangeSlideValue {
    return {
        type: CrowdDataActionTypes.UPDATE_SLIDE_VALUE,
        payload: newValue,
    }
}

export type CrowdDataActions = ChangeSlideValue

export function crowdDataSliderReducer(
    state = initialState,
    action: CrowdDataActions
): number {
    switch (action.type) {
        case CrowdDataActionTypes.UPDATE_SLIDE_VALUE:
            return action.payload;
        default:
            return state
    }
}