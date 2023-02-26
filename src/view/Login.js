import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCurrentUser, getLoggedIn, hasCollection } from '../state/app/selectors';

import { loginAndCheck } from '../state/compound-actions';
import { logout, initCollection } from '../state/app/actions';

/**
 * Get component function
 * @public
 * @return {Function}
 */
export function Login() {
    const dispatch = useDispatch();
    return (
        <div>
            <div>Logged in: {useSelector((state) =>
                getLoggedIn(state) ? getCurrentUser(state).addr : 'false',
            )}
            </div>
            <button
                hidden={useSelector(getLoggedIn)}
                onClick={() => dispatch(loginAndCheck())}>
                    Login</button>
            <button
                hidden={!useSelector(getLoggedIn)}
                onClick={() => dispatch(logout())}>
                    Logout</button>
            <div>Has collection: {useSelector(hasCollection) ? 'YES' : 'NO'}</div>
            <button
                onClick={() => dispatch(initCollection())}
            >Init Collection</button>
        </div>
    );
}
