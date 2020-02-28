import { createStore, combineReducers } from 'redux'

import { ViewReducer } from './reducers/viewReducer'

const store = createStore(
    combineReducers({
      viewState: ViewReducer
    })
);

export default store;