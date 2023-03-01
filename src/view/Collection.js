/* eslint-disable max-len */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import app from '../state/app';
import collections from '../state/collections';
import rpg from '../state/rpg';

import { Gallery } from 'react-grid-gallery';

/**
 * @public
 * @return {Function}
 */
export function Collection() {
    const dispatch = useDispatch();
    const address = useSelector(app.getAddress);
    const selectedCollectionItem = useSelector(app.getSelectedCollectionItem);

    /**
     * @public
     * @param {Array} collection
     * @return {Function}
     */
    const mapToDisplay = (collection) => {
        return collection.nfts.map((nextNFT) => {
            return {
                src: nextNFT.imageURL,
                thumbnailCaption: nextNFT.name,
                width: 300,
                height: 300,
                isSelected: selectedCollectionItem && selectedCollectionItem.id &&
                    nextNFT.id === selectedCollectionItem.id,
                id: nextNFT.id,
                // TODO: instead of caching here, add a
                // reverse-lookup selector
                data: {
                    storagePath: collection.path.identifier,
                    // TODO: get publicPath when loading collection
                    // HACK: hardcode for now to be the same base as storage
                    publicPath: collection.path.identifier.split('/')[0],
                },
            };
        });
    };

    const images = useSelector(collections.getCollections).map(mapToDisplay).flat();

    return (
        <section hidden={!useSelector(app.isLoggedIn)}>
            <h3>Collection</h3>
            <section>
                <button
                    disabled={useSelector(collections.getPending)}
                    onClick={() => dispatch(collections.fetchCollections(address))}>
                    Load Collections
                </button>
                <span hidden={!useSelector(collections.getPending)}> Loading ... </span>
            </section>
            <section hidden={!useSelector(collections.getInitialized)}>
                <span>Select an NFT to RPG ...</span>
                <Gallery
                    images={images}
                    onSelect={(index) => dispatch(app.setSelectedCollectionItem(images[index]))}>
                </Gallery>
            </section>
            <section hidden={!selectedCollectionItem}>
                <button
                    disabled={useSelector(rpg.getPending)}
                    onClick={() => dispatch(app.toggleBuilder())}>
                    Attach RPG Character
                </button>
            </section>
        </section>
    );
}
