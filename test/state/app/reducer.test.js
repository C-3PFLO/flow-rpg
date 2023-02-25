// Source
import { reduce } from '../../../src/state/app/reducer';

// Resources
import ActionTypes from '../../../src/state/app/action-types';
import { AsyncStatus } from '../../../src/state/constants';
import * as utils from '../../../src/state/utils.js';

describe('state/app/reducer', () => {
    const initialState = {
        currentUser: {},
        persistence: {
            initialized: false,
            pending: false,
            error: null,
        },
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
    describe('INIT_APP', () => {
        it('PENDING', () => {
            type = ActionTypes.INIT_APP + AsyncStatus.PENDING;
            newState = reduce(state, { type: type, payload: payload });
            expected.persistence.pending = true;
            expect(newState).toEqual(expected);
        });
        it('SUCCESS - loggedIn === true', () => {
            state.persistence.pending = true;
            type = ActionTypes.INIT_APP + AsyncStatus.SUCCESS;
            payload = { loggedIn: true, some: 'data' };
            newState = reduce(state, { type: type, payload: payload });
            expected.persistence.pending = false;
            expected.persistence.initialized = true;
            expected.currentUser = { loggedIn: true, some: 'data' };
            expect(newState).toEqual(expected);
        });
        it('SUCCESS - loggedIn === false', () => {
            state.persistence.pending = true;
            type = ActionTypes.INIT_APP + AsyncStatus.SUCCESS;
            payload = { loggedIn: false, some: 'data' };
            newState = reduce(state, { type: type, payload: payload });
            expected.persistence.pending = false;
            expected.persistence.initialized = true;
            expected.currentUser = {};
            expect(newState).toEqual(expected);
        });
        it('FAILURE', () => {
            state.persistence.pending = true;
            type = ActionTypes.INIT_APP + AsyncStatus.FAILURE;
            payload = new Error('SOME_CODE');
            newState = reduce(state, { type: type, payload: payload });
            expected.persistence.pending = false;
            expected.persistence.error = new Error('SOME_CODE');
            expect(newState).toEqual(expected);
        });
    });
    describe('LOGIN', () => {
        it('PENDING', () => {
            type = ActionTypes.LOGIN + AsyncStatus.PENDING;
            newState = reduce(state, { type: type, payload: payload });
            expected.persistence.pending = true;
            expect(newState).toEqual(expected);
        });
        it('SUCCESS', () => {
            state.persistence.pending = true;
            type = ActionTypes.LOGIN + AsyncStatus.SUCCESS;
            payload = { some: 'data' };
            newState = reduce(state, { type: type, payload: payload });
            expected.persistence.pending = false;
            expected.persistence.initialized = true;
            expected.currentUser = { some: 'data' };
            expect(newState).toEqual(expected);
        });
        it('FAILURE', () => {
            state.persistence.pending = true;
            type = ActionTypes.LOGIN + AsyncStatus.FAILURE;
            payload = new Error('SOME_CODE');
            newState = reduce(state, { type: type, payload: payload });
            expected.persistence.pending = false;
            expected.persistence.error = new Error('SOME_CODE');
            expect(newState).toEqual(expected);
        });
    });
    describe('LOGOUT', () => {
        it('nominal', () => {
            state.something = 'different';
            type = ActionTypes.LOGOUT;
            newState = reduce(state, { type: type, payload: payload });
            expect(newState).toEqual(initialState);
        });
    });
});
