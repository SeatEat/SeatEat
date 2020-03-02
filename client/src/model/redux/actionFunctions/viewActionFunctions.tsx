import { ViewActions } from '../reducers/viewReducer'
import { Dispatch } from '../store'

export function setView(dispatch: Dispatch, view: string) {
    dispatch({
        type: ViewActions.SET_VIEW,
        payload: {
            view: view
        }
    });
}