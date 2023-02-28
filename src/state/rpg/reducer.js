import ActionTypes from './action-types.js';
import { AsyncStatus } from '../constants.js';

const initialState = {
    initialized: false,
    pending: false,
    error: null,
    character: null,
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
    case ActionTypes.ATTACH_RPG_CHARACTER + AsyncStatus.PENDING:
    case ActionTypes.FETCH_RPG_CHARACTER + AsyncStatus.PENDING:
        return {
            ...state,
            pending: true,
        };
    case ActionTypes.ATTACH_RPG_CHARACTER + AsyncStatus.SUCCESS:
        return {
            ...state,
            pending: false,
            initialized: true,
        };
    case ActionTypes.FETCH_RPG_CHARACTER + AsyncStatus.SUCCESS:
        return {
            ...state,
            pending: false,
            initialized: true,
            character: action.payload,
        };
    case ActionTypes.ATTACH_RPG_CHARACTER + AsyncStatus.FAILURE:
    case ActionTypes.FETCH_RPG_CHARACTER + AsyncStatus.FAILURE:
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
