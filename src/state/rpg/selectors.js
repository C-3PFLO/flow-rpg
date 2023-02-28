/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getState(state) {
    return state && state.rpg ?
        Object.assign({}, state.rpg) : null;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getInitialized(state) {
    const rpg = getState(state);
    return rpg ? rpg.initialized : null;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getPending(state) {
    const rpg = getState(state);
    return rpg ? rpg.pending : null;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getCharacter(state) {
    const rpg = getState(state);
    return rpg ? rpg.character : null;
}
