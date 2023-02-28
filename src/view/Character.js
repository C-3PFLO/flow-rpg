/* eslint-disable max-len */

import React from 'react';
import { useSelector } from 'react-redux';

import rpg from '../state/rpg';

/**
 * @public
 * @return {Function}
 */
export function Character() {
    return (
        <section hidden={!useSelector(rpg.getInitialized)}>
            <h3>flow-rpg Character</h3>
            <span>{useSelector((state) => JSON.stringify(rpg.getCharacter(state), null, 2))}</span>
        </section>
    );
}
