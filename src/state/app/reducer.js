import ActionTypes from './action-types.js';
import { AsyncStatus } from '../constants.js';

const initialState = {
    initialized: false,
    pending: false,
    error: null,
    account: null,
    selectedCollectionItem: null,
    builderIsOpen: false,
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
    case ActionTypes.FETCH_CURRENT_ACCOUNT + AsyncStatus.PENDING:
    case ActionTypes.LOGIN + AsyncStatus.PENDING:
        return {
            ...state,
            pending: true,
        };
    case ActionTypes.FETCH_CURRENT_ACCOUNT + AsyncStatus.SUCCESS:
    case ActionTypes.LOGIN + AsyncStatus.SUCCESS:
        return {
            ...state,
            pending: false,
            initialized: true,
            account: action.payload,
        };
    case ActionTypes.FETCH_CURRENT_ACCOUNT + AsyncStatus.FAILURE:
    case ActionTypes.LOGIN + AsyncStatus.FAILURE:
        return {
            ...state,
            pending: false,
            error: action.payload,
        };
    case ActionTypes.SET_SELECTED_COLLECTION_ITEM:
        return {
            ...state,
            selectedCollectionItem: action.payload,
        };
    case ActionTypes.TOGGLE_BUILDER:
        return {
            ...state,
            builderIsOpen: !state.builderIsOpen,
        };
    case ActionTypes.ATTACH_RPG_CHARACTER + AsyncStatus.SUCCESS:
    case ActionTypes.ATTACH_RPG_CHARACTER + AsyncStatus.FAILURE:
        return {
            ...state,
            builderIsOpen: false,
        };
    case ActionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}
