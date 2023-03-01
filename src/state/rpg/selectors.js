/**
 * @public
 * @param {Object} state
 * @return {Object} state
 */
export function getState(state) {
    return state && state.rpg ?
        Object.assign({}, state.rpg) : null;
}

/**
 * @public
 * @param {Object} state
 * @return {Boolean}
 */
export function getInitialized(state) {
    const rpg = getState(state);
    return rpg ? rpg.initialized : null;
}

/**
 * @public
 * @param {Object} state
 * @return {Boolean}
 */
export function getPending(state) {
    const rpg = getState(state);
    return rpg ? rpg.pending : null;
}

/**
 * @public
 * @param {Object} state
 * @return {Object}
 */
export function getCharacter(state) {
    const rpg = getState(state);
    return rpg ? rpg.character : null;
}

/**
 * @public
 * @param {Object} state
 * @return {String}
 */
export function getName(state) {
    const character = getCharacter(state);
    return character ? character.name : null;
}

/**
 * @public
 * @param {Object} state
 * @return {String}
 */
export function getAlignment(state) {
    const character = getCharacter(state);
    return character ? character.alignment : null;
}

/**
 * @public
 * @param {Object} state
 * @return {Object}
 */
export function getClass(state) {
    const character = getCharacter(state);
    return character ? character.class : null;
}

/**
 * @public
 * @param {Object} state
 * @return {String}
 */
export function getClassName(state) {
    const characterClass = getClass(state);
    return characterClass ? characterClass.name : null;
}

/**
 * @public
 * @param {Object} state
 * @return {String}
 */
export function getClassDescription(state) {
    const characterClass = getClass(state);
    return characterClass ? characterClass.description : null;
}

/**
 * @public
 * @param {Object} state
 * @return {Object}
 */
export function getAttributes(state) {
    const character = getCharacter(state);
    return character ? character.attributes : null;
}

/**
 * @public
 * @param {Object} state
 * @param {String} attribute
 * @return {String}
 */
export function getModifierForAttribute(state, attribute) {
    const attributes = getAttributes(state);
    let modifier = attributes && attributes[attribute] ?
        Math.trunc((attributes[attribute] - 10)/2) : null;
    if (modifier && modifier > 0) {
        modifier = '+' + modifier;
    }
    return modifier;
}
