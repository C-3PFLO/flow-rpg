/**
* Defines the module reducer
*
* @module reducer
*/

import ActionTypes from './action-types.js';
import * as utils from '../utils.js';

/**
* ErrorCodes
* @const {String}
*/
const ErrorCodes = {
};

const initialState = {
    loggedIn: false,
    loggedInAccount: null,
};

/**
 * Reduce
 * @public
 * @param {Object} state current state
 * @param {Object} action action to handle
 * @return {Object} new state
 */
function reduce(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    let newState = {};
    switch (action.type) {
    case ActionTypes.SET_LOGGED_IN:
        newState = utils.deepCopy(state);
        newState.loggedIn = action.payload;
        break;
    case ActionTypes.SET_LOGGED_IN_ACCOUNT:
        newState = utils.deepCopy(state);
        newState.loggedInAccount = action.payload;
        break;
    default:
        newState = state;
        break;
    }
    return newState;
}

export {
    ErrorCodes,
    reduce,
};
