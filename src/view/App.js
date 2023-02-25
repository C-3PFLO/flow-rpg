import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../state/app/selectors';
import * as actions from '../state/app/actions';

/**
 * Get component function
 * @public
 * @return {Function}
 */
export function App() {
    const dispatch = useDispatch();
    return (
        <div>
            <div hidden={useSelector(selectors.getLoggedIn)}>
                <button onClick={() => dispatch(actions.setLoggedIn(true))}>
                    Login
                </button>
            </div>
            <div hidden={!useSelector(selectors.getLoggedIn)}>
                <span>{useSelector(selectors.getLoggedInAccount)}</span>
            </div>
        </div>
    );
}
