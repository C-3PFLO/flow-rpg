import ActionTypes from './action-types.js';
import { AsyncStatus } from '../constants.js';

const initialState = {
    initialized: false,
    pending: false,
    error: null,
    items: [],
};

/**
 * Reduce
 * @public
 * @param {Object} state current state
 * @param {Object} action action to handle
 * @return {Object} new state
 */
export function reduce(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.FETCH_COLLECTIONS + AsyncStatus.PENDING:
        return {
            ...state,
            pending: true,
        };
    case ActionTypes.FETCH_COLLECTIONS + AsyncStatus.SUCCESS:
        return {
            ...state,
            pending: false,
            initialized: true,
            items: action.payload,
        };
    case ActionTypes.FETCH_COLLECTIONS + AsyncStatus.FAILURE:
        return {
            ...state,
            pending: false,
            error: action.payload,
        };
    // dispatched by app, but relevant here
    case ActionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}
