import ActionTypes from './action-types';
import * as collections from '../../fcl/collections';

/**
 * @public
 * @param {String} address
 * @return {Object} action
 */
export function fetchAllNFTs(address) {
    return {
        type: ActionTypes.GET_ALL_NFTS,
        payload: collections.getAllNFTs(address),
    };
}
