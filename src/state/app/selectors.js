/**
* Defines the module selectors
*
* @module selectors
*/

import * as utils from '../utils.js';

/**
 * Get state
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
function getApp(state) {
    return state && state.app ?
        utils.deepCopy(state.app) : null;
}

/**
 * Get state
 * @public
 * @param {Object} state current state
 * @return {Boolean}
 */
function getLoggedIn(state) {
    const app = getApp(state);
    return app ? app.loggedIn : null;
}

/**
 * Get state
 * @public
 * @param {Object} state current state
 * @return {Object}
 */
function getLoggedInAccount(state) {
    const app = getApp(state);
    return app && app.loggedInAccount ? app.loggedInAccount : null;
}

export {
    getApp,
    getLoggedIn,
    getLoggedInAccount,
};
