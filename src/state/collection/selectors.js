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
export function getCollection(state) {
    return state && state.collection ?
        utils.deepCopy(state.collection) : null;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getPersistence(state) {
    const app = getCollection(state);
    return app && app.persistence ? app.persistence : {};
}
