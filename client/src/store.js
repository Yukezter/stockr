import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import allReducers from './reducers'

const middleware = [thunk]
const initialState = {}

const store = createStore(
    allReducers,
    initialState,
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

export default store