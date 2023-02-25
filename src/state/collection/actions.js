/**
* Defines the module actions
*
* @module actions
*/

import ActionTypes from './action-types.js';
import { initCollection } from '../fcl/transactions';

/**
 * @public
 * @return {Object} action
 */
export function init() {
    return {
        type: ActionTypes.INIT_COLLECTION,
        payload: initCollection(),
    };
}
