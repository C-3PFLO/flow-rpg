/**
* Defines the module actions
*
* @module actions
*/

import ActionTypes from './action-types.js';

/**
 * @public
 * @param {Boolean} loggedIn
 * @return {Object} action
 */
function setLoggedIn(loggedIn) {
    return {
        type: ActionTypes.SET_LOGGED_IN,
        payload: loggedIn,
    };
}

/**
 * @public
 * @param {Object} loggedInAccount
 * @return {Object} action
 */
function setLoggedInAccount(loggedInAccount) {
    return {
        type: ActionTypes.SET_LOGGED_IN_ACCOUNT,
        payload: loggedInAccount,
    };
}

export {
    setLoggedIn,
    setLoggedInAccount,
};
