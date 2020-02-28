export const ViewActions = {
    SET_VIEW: 'SET_VIEW',
}

export interface ViewPayload {
    view: string,
}

export interface ViewAction {
    type: keyof typeof ViewActions,
    payload: ViewPayload
}

export const ViewReducer = (state: ViewPayload = { view: 'current' }, action: ViewAction) => {
    switch (action.type) {
        case ViewActions.SET_VIEW:
            return action.payload.view;
        default:
            return state;
    }
}
