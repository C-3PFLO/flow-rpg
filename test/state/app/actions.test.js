import * as actions from '../../../src/state/app/actions';
import ActionTypes from '../../../src/state/app/action-types';

import * as fcl from '@onflow/fcl';
jest.mock('@onflow/fcl');

describe('state/app/actions', () => {
    describe('initApp', () => {
        beforeEach(() => {
            fcl.currentUser.snapshot(() => {});
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('nominal', () => {
            const action = actions.initApp();
            expect(action.type).toEqual(ActionTypes.INIT_APP);
            expect(fcl.currentUser.snapshot).toHaveBeenCalled();
        });
    });
    describe('login', () => {
        let _callback;
        beforeEach(() => {
            fcl.currentUser.subscribe.mockImplementationOnce((callback) => {
                _callback = callback;
            });
            fcl.authenticate.mockImplementationOnce(() => {});
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('nominal', (done) => {
            const action = actions.login();
            expect(action.type).toEqual(ActionTypes.LOGIN);
            expect(fcl.currentUser.subscribe).toHaveBeenCalled();
            expect(fcl.authenticate).toHaveBeenCalled();
            action.payload.promise.then((response) => {
                expect(response).toEqual({ loggedIn: true, some: 'data' });
                done();
            });
            _callback({});
            _callback({ loggedIn: false });
            _callback({ loggedIn: true, some: 'data' });
        });
    });
    describe('logout', () => {
        it('nominal', () => {
            const action = actions.logout();
            expect(action.type).toEqual(ActionTypes.LOGOUT);
        });
    });
});
