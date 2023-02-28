import ActionTypes from './action-types';
import * as flowRPG from '../../fcl/flow-rpg';

/**
 * @public
* @param {String} collectionStoragePath
* @param {String} collectionPublicPath
* @param {Integer} itemID
* @param {String} name
* @param {String} alignment
* @param {String} classID
* @param {Integer} strength
* @param {Integer} dexterity
* @param {Integer} constitution
* @param {Integer} intelligence
* @param {Integer} wisdom
* @param {Integer} charisma
 * @return {Object} action
 */
export function attachRPGCharacter(
    collectionStoragePath,
    collectionPublicPath,
    itemID,
    name,
    alignment,
    classID,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
) {
    return {
        type: ActionTypes.ATTACH_RPG_CHARACTER,
        payload: flowRPG.attachRPGCharacter(
            collectionStoragePath,
            collectionPublicPath,
            itemID,
            name,
            alignment,
            classID,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
        ),
    };
}

/**
* @public
* @param {String} address
* @param {String} collectionPublicPath
* @param {Integer} itemID
 * @return {Object} action
 */
export function fetchRPGCharacter(
    address,
    collectionPublicPath,
    itemID,
) {
    return {
        type: ActionTypes.FETCH_RPG_CHARACTER,
        payload: flowRPG.fetchRPGCharacter(
            address,
            collectionPublicPath,
            itemID,
        ),
    };
}

/**
* @public
* @param {String} address
* @param {String} collectionStoragePath
* @param {String} collectionPublicPath
* @param {Integer} itemID
* @param {String} name
* @param {String} alignment
* @param {String} classID
* @param {Integer} strength
* @param {Integer} dexterity
* @param {Integer} constitution
* @param {Integer} intelligence
* @param {Integer} wisdom
* @param {Integer} charisma
* @return {Promise}
*/
export function attachRPGCharacterAndFetch(
    address,
    collectionStoragePath,
    collectionPublicPath,
    itemID,
    name,
    alignment,
    classID,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
) {
    return function(dispatch) {
        return dispatch(
            attachRPGCharacter(
                collectionStoragePath,
                collectionPublicPath,
                itemID,
                name,
                alignment,
                classID,
                strength,
                dexterity,
                constitution,
                intelligence,
                wisdom,
                charisma,
            ),
        ).then(() => {
            return dispatch(
                fetchRPGCharacter(
                    address,
                    collectionPublicPath,
                    itemID,
                ),
            );
        });
    };
}
