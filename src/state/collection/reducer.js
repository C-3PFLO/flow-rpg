/**
* Defines the module reducer
*
* @module reducer
*/

import ActionTypes from './action-types.js';
import { AsyncStatus } from '../constants.js';
import * as utils from '../utils.js';

/**
* ErrorCodes
* @const {String}
*/
const ErrorCodes = {
};

const initialState = {
    _to_do_: {},
    persistence: {
        initialized: false,
        pending: false,
        error: null,
    },
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
    case ActionTypes.INIT_COLLECTION + AsyncStatus.PENDING:
        newState = utils.deepCopy(initialState); // reset to initial
        newState.persistence.pending = true;
        break;
    case ActionTypes.INIT_COLLECTION + AsyncStatus.SUCCESS:
        newState = utils.deepCopy(state);
        newState.persistence.initialized = true;
        newState.persistence.pending = false;
        newState._to_do_ = action.payload;
        break;
    case ActionTypes.INIT_COLLECTION + AsyncStatus.FAILURE:
        newState = utils.deepCopy(state);
        newState.persistence.pending = false;
        newState.persistence.error = action.payload;
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
