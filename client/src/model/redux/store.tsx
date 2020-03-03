import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { ViewReducer, ViewActions } from './viewState'
import { estmiationReducer, EstimationActions } from './estimationState';
import { CrowdDataActions, crowdDataSliderReducer } from './crowdDataSliderState';

const rootReducer = combineReducers({
    viewState: ViewReducer,
    estimationState: estmiationReducer,
    crowdDataSlideState: crowdDataSliderReducer,
});

export type AppActions = 
    EstimationActions | 
    CrowdDataActions |
    ViewActions;

export type AppState = ReturnType<typeof rootReducer>
const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);
  
export default store;
export type Dispatch = typeof store.dispatch