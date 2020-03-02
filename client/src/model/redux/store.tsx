import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { ViewReducer } from './reducers/viewReducer'
import { estmiationReducer, EstimationActions } from './estimationState';

const rootReducer = combineReducers({
    viewState: ViewReducer,
    estimationState: estmiationReducer
});
export type AppActions = EstimationActions;
export type AppState = ReturnType<typeof rootReducer>
const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);
  
export default store;
export type Dispatch = typeof store.dispatch