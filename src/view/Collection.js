/* eslint-disable max-len */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import app from '../state/app';
import collections from '../state/collections';

/**
 * Get component function
 * @public
 * @return {Function}
 */
export function Collection() {
    const dispatch = useDispatch();
    const address = useSelector(app.getAddress);

    return (
        <section hidden={!useSelector(app.isLoggedIn)}>
            <h3>Collection</h3>
            <div>
                <button
                    // disabled={useSelector(collections.getInitialized)}
                    onClick={() => dispatch(collections.fetchAllNFTs(address))}>
                    Load Collection
                </button>
                <span hidden={!useSelector(collections.getPending)}> Loading ... </span>
            </div>
            <div hidden={!useSelector(collections.getInitialized)}>
                <span>{useSelector((state) => JSON.stringify(collections.getAllNFTs(state)))}</span>
            </div>
        </section>
    );
}
