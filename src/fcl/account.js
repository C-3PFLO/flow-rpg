import * as fcl from '@onflow/fcl';

/**
 * @public
 * @return {Promise}
 */
export function fetchCurrentAccount() {
    return fcl.currentUser.snapshot();
}

/**
 * @public
 * @return {Promise}
 */
export function login() {
    return new Promise((resolve) => {
        // HACK: subscribing multiple times - need an unsubscribe
        fcl.currentUser.subscribe((currentUser) => {
            // HACK: need to check for rejection, but not clear
            // what those responses actually look like
            // not called back on login window dismissal to cancel
            if (currentUser && currentUser.loggedIn) {
                resolve(currentUser);
            }
        });
        fcl.authenticate();
    });
}

/**
 * @public
 * @return {Promise}
 */
export function logout() {
    return fcl.unauthenticate();
}
