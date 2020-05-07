import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { viewReducer, ViewActions } from './viewState'
import { estmiationReducer, EstimationActions } from './estimationState';
import { CrowdDataActions, crowdDataSliderReducer } from './crowdDataSliderState';
import { checkInReducer, CheckInActions } from './checkInState';
import { ToogleMobileMenu, mobileMenuReducer } from './mobilMenuState';

const persistConfig = {
    key: 'checkInState',
    storage,
    whitelist: ['checkInUser']
}

const persistedCheckInStateReducer = persistReducer(persistConfig, checkInReducer)

const rootReducer = combineReducers({
    viewState: viewReducer,
    estimationState: estmiationReducer,
    crowdDataSlideState: crowdDataSliderReducer,
    checkInState: persistedCheckInStateReducer,
    mobileMenuState: mobileMenuReducer,
});

export type AppActions = 
    EstimationActions | 
    CrowdDataActions |
    ViewActions |
    CheckInActions | 
    ToogleMobileMenu;

export type AppState = ReturnType<typeof rootReducer>


const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);

export const persistor = persistStore(store);

export default store;
export type Dispatch = typeof store.dispatch