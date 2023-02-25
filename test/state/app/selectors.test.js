import * as selectors from '../../../src/state/app/selectors';

describe('state/app/selectors', () => {
    let state;
    beforeEach(() => {
        state = {
            app: {
                currentUser: {},
                persistence: {
                    initialized: false,
                    pending: false,
                    error: null,
                },
            },
        };
    });
    describe('getApp', () => {
        it('nominal', () => {
            expect(selectors.getApp(state))
                .toEqual(state.app);
            expect(selectors.getApp(state))
                .not.toBe(state.app);
        });
    });
    describe('getLoggedIn', () => {
        it('initialized = false', () => {
            expect(selectors.getLoggedIn(state))
                .toEqual(false);
        });
        it('currentUser.loggedIn = false', () => {
            state.app.persistence.initialized = true;
            state.app.currentUser.loggedIn = false;
            expect(selectors.getLoggedIn(state))
                .toEqual(false);
        });
        it('loggedIn = true', () => {
            state.app.persistence.initialized = true;
            state.app.currentUser.loggedIn = true;
            expect(selectors.getLoggedIn(state))
                .toEqual(true);
        });
    });
});
