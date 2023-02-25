import * as selectors from '../../../src/state/app/selectors';

describe('state/app/selectors', () => {
    const state = {
        app: {
            loggedIn: true,
            loggedInAccount: {
                some: 'data',
            },
        },
    };
    describe('getApp', () => {
        it('nominal', () => {
            expect(selectors.getApp(state))
                .toEqual(state.app);
            expect(selectors.getApp(state))
                .not.toBe(state.app);
        });
        it('empty', () => {
            expect(selectors.getApp({}))
                .toEqual(null);
        });
    });
    describe('getLoggedIn', () => {
        it('nominal', () => {
            expect(selectors.getLoggedIn(state))
                .toEqual(true);
        });
    });
    describe('getLoggedInAccount', () => {
        it('nominal', () => {
            expect(selectors.getLoggedInAccount(state))
                .toEqual({ some: 'data' });
        });
    });
});
