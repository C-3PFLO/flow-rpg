/**
* Defines the module selectors
*
* @module selectors
*/

import * as utils from '../utils.js';

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getApp(state) {
    return state && state.app ?
        utils.deepCopy(state.app) : null;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getPersistence(state) {
    const app = getApp(state);
    return app && app.persistence ? app.persistence : {};
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getCurrentUser(state) {
    const app = getApp(state);
    return app && app.currentUser ? app.currentUser : {};
}

/**
 * Get state
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getLoggedIn(state) {
    const persistence = getPersistence(state);
    const currentUser = getCurrentUser(state);
    return persistence.initialized && currentUser.loggedIn;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getCurrentAddress(state) {
    const currentUser = getCurrentUser(state);
    return currentUser && currentUser.addr ? currentUser.addr : null;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function hasCollection(state) {
    const app = getApp(state);
    return app ? app.hasCollection : null;
}
