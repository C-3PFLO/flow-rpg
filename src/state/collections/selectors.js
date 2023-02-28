/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getState(state) {
    return state && state.collections ?
        Object.assign({}, state.collections) : null;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getInitialized(state) {
    const collections = getState(state);
    return collections ? collections.initialized : null;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getPending(state) {
    const collections = getState(state);
    return collections ? collections.pending : null;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getCollections(state) {
    const collections = getState(state);
    return collections ? collections.items : null;
}
