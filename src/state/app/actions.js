import ActionTypes from './action-types';
import * as account from '../../fcl/account';

/**
 * @public
 * @return {Object} action
 */
export function fetchCurrentAccount() {
    return {
        type: ActionTypes.FETCH_CURRENT_ACCOUNT,
        payload: account.fetchCurrentAccount(),
    };
}

/**
 * @public
 * @return {Object} action
 */
export function login() {
    return {
        type: ActionTypes.LOGIN,
        payload: account.login(),
    };
}

/**
 * @public
 * @return {Object} action
 */
export function logout() {
    account.logout();
    return {
        type: ActionTypes.LOGOUT,
    };
}
