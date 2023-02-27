import React from 'react';

import { Login } from './Login';

import * as store from '../state/store';
import { getCurrentAddress } from '../state/app/selectors';

import { attachRPGCharacter } from '../state/fcl/transactions';
import { getIDs, getRPGCharacter } from '../state/fcl/scripts';

const idIndex = 3;

/**
 * @private
 */
function attach() {
    let id;
    const address = getCurrentAddress(store.getStore().getState());
    getIDs(address).then((ids) => {
        id = ids[idIndex];
        return Promise.resolve();
    }).then(() => {
        return attachRPGCharacter(
            'myExampleNFTCollectionV1',
            'myExampleNFTCollectionV1',
            id,
            'c-3pflo',
            'good-lawful',
            'sorcerer-v1',
            '8', '11', '8', '15', '15', '12',
        );
    }).then(() => {
        return getRPGCharacter(
            address,
            'myExampleNFTCollectionV1',
            id,
        );
    }).then(console.log);
}

/**
 * @private
 */
function get() {
    let id;
    const address = getCurrentAddress(store.getStore().getState());
    getIDs(address).then((ids) => {
        id = ids[idIndex];
        return Promise.resolve();
    }).then(() => {
        return getRPGCharacter(
            address,
            'myExampleNFTCollectionV1',
            id,
        );
    }).then(console.log);
}

/**
 * Get component function
 * @public
 * @return {Function}
 */
export function App() {
    return (
        <div>
            <Login/>
            <button onClick={attach}>Attach RPG Character</button>
            <button onClick={get}>Get RPG Character</button>
        </div>
    );
}
