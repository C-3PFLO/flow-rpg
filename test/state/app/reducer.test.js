// Source
import { reduce } from '../../../src/state/app/reducer';

// Resources
import ActionTypes from '../../../src/state/app/action-types';
import * as utils from '../../../src/state/utils.js';

describe('state/app/reducer', () => {
    const initialState = {
        loggedIn: false,
        loggedInAccount: null,
    };
    let state = {};
    let newState = null;
    let expected = null;
    let type = null;
    let payload = null;
    beforeEach(() => {
        state = utils.deepCopy(initialState);
        expected = utils.deepCopy(initialState);
        type = null;
        payload = null;
    });
    describe('initialState and default', () => {
        it('initialState', () => {
            expect(reduce(undefined)).toEqual(initialState);
        });
        it('default', () => {
            expect(reduce(state, { type: 'nope' })).toEqual(state);
        });
    });
    describe('SET_LOGGED_IN', () => {
        it('nominal', () => {
            type = ActionTypes.SET_LOGGED_IN;
            payload = true;
            expected.loggedIn = true;
            newState = reduce(state, { type: type, payload: payload });
            expect(newState).toEqual(expected);
        });
    });
    describe('SET_LOGGED_IN_ACCOUNT', () => {
        it('nominal', () => {
            type = ActionTypes.SET_LOGGED_IN_ACCOUNT;
            payload = { some: 'data' };
            expected.loggedInAccount = { some: 'data' };
            newState = reduce(state, { type: type, payload: payload });
            expect(newState).toEqual(expected);
        });
    });
});
