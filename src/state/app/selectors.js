/**
 * @public
 * @param {Object} state
 * @return {Object}
 */
export function getState(state) {
    return state && state.app ?
        Object.assign({}, state.app) : null;
}

/**
 * @public
 * @param {Object} state
 * @return {Boolean}
 */
export function getInitialized(state) {
    const app = getState(state);
    return app ? app.initialized : null;
}

/**
 * @public
 * @param {Object} state
 * @return {Boolean}
 */
export function getPending(state) {
    const app = getState(state);
    return app ? app.pending : null;
}

/**
 * @public
 * @param {Object} state
 * @return {Object}
 */
export function getAccount(state) {
    const app = getState(state);
    return app ? app.account : null;
}

/**
 * @public
 * @param {Object} state
 * @return {Boolean}
 */
export function isLoggedIn(state) {
    const account = getAccount(state);
    return account && account.loggedIn;
}

/**
 * @public
 * @param {Object} state
 * @return {Strin}
 */
export function getAddress(state) {
    const account = getAccount(state);
    return account && account.addr;
}

/**
 * @public
 * @param {Object} state
 * @return {Object}
 */
export function getSelectedCollectionItem(state) {
    const app = getState(state);
    return app && app.selectedCollectionItem;
}

/**
 * @public
 * @param {Object} state
 * @return {Boolean}
 */
export function isBuilderOpen(state) {
    const app = getState(state);
    return app ? app.builderIsOpen : null;
}
