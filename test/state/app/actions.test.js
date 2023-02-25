import * as actions from '../../../src/state/app/actions';
import ActionTypes from '../../../src/state/app/action-types';

describe('state/app/actions', () => {
    describe('setLoggedIn', () => {
        it('nominal', () => {
            const action = actions.setLoggedIn(true);
            expect(action.type)
                .toEqual(ActionTypes.SET_LOGGED_IN);
            expect(action.payload).toEqual(true);
        });
    });
    describe('setLoggedInAccount', () => {
        it('nominal', () => {
            const action = actions.setLoggedInAccount({ some: 'data' });
            expect(action.type)
                .toEqual(ActionTypes.SET_LOGGED_IN_ACCOUNT);
            expect(action.payload).toEqual({ some: 'data' });
        });
    });
});
