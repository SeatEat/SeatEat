import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { viewReducer, ViewActions } from './viewState'
import { estmiationReducer, EstimationActions } from './estimationState';
import { CrowdDataActions, crowdDataSliderReducer } from './crowdDataSliderState';
import { checkInReducer, CheckInActions } from './checkInState';
import { userReducer } from './userState';

import { addCheckInListener } from '../check-in-model'

const rootReducer = combineReducers({
    viewState: viewReducer,
    estimationState: estmiationReducer,
    crowdDataSlideState: crowdDataSliderReducer,
    checkInState: checkInReducer,
    userState: userReducer
});

export type AppActions = 
    EstimationActions | 
    CrowdDataActions |
    ViewActions |
    CheckInActions;

export type AppState = ReturnType<typeof rootReducer>
const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);

addCheckInListener(store);
  
export default store;
export type Dispatch = typeof store.dispatch