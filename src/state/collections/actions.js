import ActionTypes from './action-types';
import * as collections from '../../fcl/collections';

/**
 * @public
 * @param {String} address
 * @return {Object} action
 */
export function fetchCollections(address) {
    return {
        type: ActionTypes.FETCH_COLLECTIONS,
        payload: collections.fetchCollections(address),
    };
}
