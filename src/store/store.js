import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};

const middleware = [thunk];

const devTools = process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : null;

const store = (devTools)
    ? createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), devTools))
    : createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));

export default store;