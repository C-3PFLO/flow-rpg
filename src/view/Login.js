import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCurrentUser, getLoggedIn } from '../state/app/selectors';
import { login, logout } from '../state/app/actions';

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
                onClick={() => dispatch(login())}>
                    Login</button>
            <button
                hidden={!useSelector(getLoggedIn)}
                onClick={() => dispatch(logout())}>
                    Logout</button>
        </div>
    );
}
