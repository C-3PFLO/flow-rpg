/* eslint-disable max-len */

import React from 'react';
import { useSelector } from 'react-redux';

import app from '../state/app';
import rpg from '../state/rpg';

/**
 * @public
 * @return {Function}
 */
export function Character() {
    const selectedCollectionItem = useSelector(app.getSelectedCollectionItem);
    const image = selectedCollectionItem ? selectedCollectionItem.src : null;

    return (
        <section hidden={!useSelector(rpg.getInitialized)}>
            <h3>flow-rpg Character</h3>
            <div className="character">
                <div className="character-header">
                    <img src={image} className="profile"></img>
                    <div className='character-basics'>
                        <div className='character-basics-row'>
                            <label>Name</label>
                            <label>Description</label>
                            <label>Class</label>
                            <label>Alignment</label>
                        </div>
                        <div className='character-basics-row'>
                            <span>{useSelector(rpg.getName)}</span>
                            <span>{useSelector(rpg.getClassDescription)}</span>
                            <span>{useSelector(rpg.getClassName)}</span>
                            <span>{useSelector(rpg.getAlignment)}</span>
                        </div>
                    </div>
                </div>
                <h4>Attributes</h4>
                <div className='character-attributes'>
                    <div className='character-attribute'>
                        <div className='character-attribute-value strength'>{useSelector((state) => rpg.getModifierForAttribute(state, 'strength'))}</div>
                        <span className='character-attribute-label'>STR</span>
                    </div>
                    <div className='character-attribute'>
                        <div className='character-attribute-value dexterity'>{useSelector((state) => rpg.getModifierForAttribute(state, 'dexterity'))}</div>
                        <span className='character-attribute-label'>DEX</span>
                    </div>
                    <div className='character-attribute'>
                        <div className='character-attribute-value constitution'>{useSelector((state) => rpg.getModifierForAttribute(state, 'constitution'))}</div>
                        <span className='character-attribute-label'>CON</span>
                    </div>
                    <div className='character-attribute'>
                        <div className='character-attribute-value intelligence'>{useSelector((state) => rpg.getModifierForAttribute(state, 'intelligence'))}</div>
                        <span className='character-attribute-label'>INT</span>
                    </div>
                    <div className='character-attribute'>
                        <div className='character-attribute-value wisdom'>{useSelector((state) => rpg.getModifierForAttribute(state, 'wisdom'))}</div>
                        <span className='character-attribute-label'>WIS</span>
                    </div>
                    <div className='character-attribute'>
                        <div className='character-attribute-value charisma'>{useSelector((state) => rpg.getModifierForAttribute(state, 'charisma'))}</div>
                        <span className='character-attribute-label'>CHA</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
