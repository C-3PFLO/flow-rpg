import React from 'react';

import { Login } from './Login';
import { Collection } from './Collection';
import { Character } from './Character';
import { Builder } from './Builder';

import './styles.css';

/**
 * Get component function
 * @public
 * @return {Function}
 */
export function App() {
    // const dispatch = useDispatch();

    return (
        <>
            <h1>flow-rpg</h1>
            <h3>To RPG your NFT &trade;</h3>
            <Login/>
            <Collection/>
            <Character/>
            <Builder/>
        </>
    );
}
