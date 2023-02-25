/**
* Defines the module actions
*
* @module actions
*/

import ActionTypes from './action-types.js';

import * as fcl from '@onflow/fcl';

/**
 * @public
 * @return {Promise}
 */
function _loginAndWait() {
    return new Promise((resolve) => {
        // HACK: subscribing multiple times - need an unsubscribe
        fcl.currentUser.subscribe((currentUser) => {
            // HACK: need to check for rejection, but not clear
            // what those responses actually look like
            // not called back on login window dismissal to cancel
            if (currentUser && currentUser.loggedIn) {
                resolve(currentUser);
            }
        });
        fcl.authenticate();
    });
}

/**
 * @public
 * @return {Object} action
 */
export function init() {
    return {
        type: ActionTypes.INIT_APP,
        payload: fcl.currentUser.snapshot(),
    };
}

/**
 * @public
 * @return {Object} action
 */
export function login() {
    return {
        type: ActionTypes.LOGIN,
        payload: {
            promise: _loginAndWait(),
        },
    };
}

/**
 * @public
 * @return {Object} action
 */
export function logout() {
    fcl.unauthenticate();
    return {
        type: ActionTypes.LOGOUT,
    };
}
