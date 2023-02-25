import * as redux from 'redux';

import thunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';

import reducer from './reducer.js';

/**
* ErrorCodes
* @const {String}
*/
const ErrorCodes = {
    STORE_ALREADY_DEFINED: 'STORE_ALREADY_DEFINED',
    NO_STORE_DEFINED: 'NO_STORE_DEFINED',
};

let _store = null;

/**
 * Creates a redux store, configured as needed for this application
 * @public
 */
function createStore() {
    if (_store) {
        throw new Error(ErrorCodes.STORE_ALREADY_DEFINED);
    }
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
                { trace: true, traceLimit: 25 },
            ) : redux.compose;
    _store = redux.createStore(
        reducer,
        composeEnhancers(
            redux.applyMiddleware(
                thunk,
                reduxPromiseMiddleware,
            ),
        ),
    );
}

/**
 * Returns the store
 * @public
 * @return {Object} the store
 */
function getStore() {
    if (!_store) {
        throw new Error(ErrorCodes.NO_STORE_DEFINED);
    }
    return _store;
}

/**
 * Debug function to reset the store
 * @public
 */
function _resetStore() {
    _store = null;
}

export {
    ErrorCodes,
    createStore,
    getStore,
    _resetStore,
};
