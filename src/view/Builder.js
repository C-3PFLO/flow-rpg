/* eslint-disable max-len */

import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import app from '../state/app';
import rpg from '../state/rpg';

import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: '20%',
        bottom: '20%',
        marginRight: '-20%',
        transform: 'translate(-50%, -50%)',
    },
};

/**
 * @public
 * @return {Function}
 */
export function Builder() {
    const dispatch = useDispatch();
    const address = useSelector(app.getAddress);
    const selectedCollectionItem = useSelector(app.getSelectedCollectionItem);
    const image = selectedCollectionItem ? selectedCollectionItem.src : null;

    const nameRef = useRef(null);
    const classRef = useRef(null);
    const alignmentRef = useRef(null);

    const strengthRef = useRef('10');
    const dexterityRef = useRef('10');
    const constitutionRef = useRef('10');
    const intelligenceRef = useRef('10');
    const wisdomRef = useRef('10');
    const charismaRef = useRef('10');

    return (
        <>
            <Modal
                isOpen={useSelector(app.isBuilderOpen)}
                style={customStyles}
                onRequestClose={() => dispatch(app.toggleBuilder())}
            >
                <button type='button' onClick={() => dispatch(app.toggleBuilder())} className='close'>&times;</button>
                <div className='character-builder'>
                    <div>
                        <h3>flow-rpg Character</h3>
                        <div className='character'>
                            <div className='character-header'>
                                <img src={image} className='profile'></img>
                                <div className='character-basics'>
                                    <div className='character-basics-row character-basics-row-labels'>
                                        <label htmlFor='character-name'>Name</label>
                                        <label htmlFor='character-class'>Class</label>
                                        <label htmlFor='character-alignment'>Alignment</label>
                                    </div>
                                    <div className='character-basics-row'>
                                        <input autoFocus id='character-name' placeholder='enter a name...' ref={nameRef}></input>
                                        <select id='character-class' ref={classRef}>
                                            {/* TODO: get from chain and populate dynamically */}
                                            <option value='wizard-v1'>Wizard</option>
                                            <option value='sorcerer-v1'>Sorcerer</option>
                                            <option value='barbarian-v1'>Barbarian</option>
                                            <option value='ranger-v1'>Ranger</option>
                                            <option value='rogue-v1'>Rogue</option>
                                        </select>
                                        <select id='character-alignment' ref={alignmentRef}>
                                            {/* TODO: get from chain and populate dynamically */}
                                            <option value='good-lawful'>good-lawful</option>
                                            <option value='good-neutral'>good-neutral</option>
                                            <option value='good-chaotic'>good-chaotic</option>
                                            <option value='neutral-lawful'>neutral-lawful</option>
                                            <option value='neutral-neutral'>neutral-neutral</option>
                                            <option value='neutral-chaotic'>neutral-chaotic</option>
                                            <option value='evil-lawful'>evil-lawful</option>
                                            <option value='evil-neutral'>evil-neutral</option>
                                            <option value='evil-chaotic'>evil-chaotic</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <h4>Attributes</h4>
                            {/* TODO: refactor this into a single element repeated for an array of attributes */}
                            <div className='character-attributes'>
                                <div className='character-attribute'>
                                    <label htmlFor='strength' className='character-attribute-label'>STR</label>
                                    <input id='stregth' ref={strengthRef} type='number' min='8' max='15' defaultValue='10'>
                                    </input>
                                </div>
                                <div className='character-attribute'>
                                    <label htmlFor='dexterity' className='character-attribute-label'>DEX</label>
                                    <input id='dexterity' ref={dexterityRef} type='number' min='8' max='15' defaultValue='10'>
                                    </input>
                                </div>
                                <div className='character-attribute'>
                                    <label htmlFor='constitution' className='character-attribute-label'>CON</label>
                                    <input id='constitution' ref={constitutionRef} type='number' min='8' max='15' defaultValue='10'>
                                    </input>
                                </div>
                                <div className='character-attribute'>
                                    <label htmlFor='intelligence' className='character-attribute-label'>INT</label>
                                    <input id='intelligence' ref={intelligenceRef} type='number' min='8' max='15' defaultValue='10'>
                                    </input>
                                </div>
                                <div className='character-attribute'>
                                    <label htmlFor='wisdom' className='character-attribute-label'>WIS</label>
                                    <input id='wisdom' ref={wisdomRef} type='number' min='8' max='15' defaultValue='10'>
                                    </input>
                                </div>
                                <div className='character-attribute'>
                                    <label htmlFor='strecharismangth' className='character-attribute-label'>CHA</label>
                                    <input id='charisma' ref={charismaRef} type='number' min='8' max='15' defaultValue='10'>
                                    </input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='character-builder-actions'>
                        <span hidden={!useSelector(rpg.getPending)}>Saving ...</span>
                        <button
                            disabled={useSelector(rpg.getPending)}
                            onClick={() => dispatch(rpg.attachRPGCharacterAndFetch(
                                address,
                                selectedCollectionItem.data.storagePath,
                                selectedCollectionItem.data.publicPath,
                                selectedCollectionItem.id,
                                nameRef.current.value,
                                alignmentRef.current.value,
                                classRef.current.value,
                                strengthRef.current.value,
                                dexterityRef.current.value,
                                constitutionRef.current.value,
                                intelligenceRef.current.value,
                                wisdomRef.current.value,
                                charismaRef.current.value,
                            ))}>
                            Save
                        </button>
                        <button onClick={() => dispatch(app.toggleBuilder())}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
