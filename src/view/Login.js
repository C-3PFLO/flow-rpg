/* eslint-disable max-len */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import app from '../state/app';

/**
 * Get component function
 * @public
 * @return {Function}
 */
export function Login() {
    const dispatch = useDispatch();
    const address = useSelector(app.getAddress);

    useEffect(() => {
        dispatch(app.fetchCurrentAccount());
    }, []);

    return (
        <section>
            <div hidden={useSelector(app.isLoggedIn)}>
                <button onClick={() => dispatch(app.login())}>
                    Login
                </button>
                <span hidden={!useSelector(app.getPending)}> Loading ... </span>
            </div>
            <div hidden={!useSelector(app.isLoggedIn)}>
                <button onClick={() => dispatch(app.logout())}>
                    Logout
                </button>
                <span> Account: {address}</span>
            </div>
        </section>
    );
}
