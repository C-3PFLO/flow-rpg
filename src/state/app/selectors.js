/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getState(state) {
    return state && state.app ?
        Object.assign({}, state.app) : null;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getInitialized(state) {
    const app = getState(state);
    return app ? app.initialized : null;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getPending(state) {
    const app = getState(state);
    return app ? app.pending : null;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getAccount(state) {
    const app = getState(state);
    return app ? app.account : null;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function isLoggedIn(state) {
    const account = getAccount(state);
    return account && account.loggedIn;
}

/**
 * @public
 * @param {Object} state current state
 * @return {Object} state
 */
export function getAddress(state) {
    const account = getAccount(state);
    return account && account.addr;
}
