import { createStore, combineReducers, applyMiddleware } from 'redux'

import { ViewReducer } from './reducers/viewReducer'

/*For debugging*/
const logger = (store: { getState: () => any; }) => (next: (arg0: any) => any) => (action: { type: any; }) => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

const createStoreWithMiddleware = applyMiddleware(logger)(createStore)
const reducers = combineReducers({
    viewState: ViewReducer
})
const store = createStoreWithMiddleware(reducers)
  
export default store;

export type Dispatch = typeof store.dispatch