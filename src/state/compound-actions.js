import * as store from './store';

import { initApp, login, checkCollection } from './app/actions';
import { getCurrentAddress } from './app/selectors';

/**
 * @public
 * @return {Promise}
 */
export function initializeApp() {
    return function(dispatch) {
        return dispatch(initApp())
            .then(() => {
                const address = getCurrentAddress(
                    store.getStore().getState(),
                );
                if (address) {
                    return dispatch(checkCollection(address));
                }
            });
    };
}

/**
 * @public
 * @return {Promise}
 */
export function loginAndCheck() {
    return function(dispatch) {
        return dispatch(login())
            .then(() => {
                const address = getCurrentAddress(
                    store.getStore().getState(),
                );
                if (address) {
                    return dispatch(checkCollection(address));
                }
            });
    };
}
