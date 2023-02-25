import * as store from '../../src/state/store';
import reducer from '../../src/state/reducer';

import * as redux from 'redux';
jest.mock('redux');

describe('state/store', () => {
    const _store = { a: 'store' };
    beforeEach(() => {
        jest.clearAllMocks();
        redux.createStore.mockImplementationOnce(() => {
            return _store;
        });
        redux.applyMiddleware.mockImplementationOnce(() => {
            return 'middleware';
        });
        redux.compose.mockImplementationOnce((middleware) => {
            return middleware;
        });
    });
    afterEach(() => {
        store._resetStore();
    });
    describe('createStore', () => {
        const initialState = { some: 'state' };
        it('nominal', () => {
            store.createStore(initialState);
            expect(redux.createStore).toHaveBeenCalledWith(
                reducer,
                'middleware',
            );
        });
        it('throws STORE_ALREADY_DEFINED', () => {
            store.createStore(initialState);
            expect(store.createStore).toThrow(
                new Error(store.ErrorCodes.STORE_ALREADY_DEFINED),
            );
        });
    });
    describe('getStore', () => {
        it('nominal', () => {
            store.createStore();
            expect(store.getStore()).toBe(_store);
        });
        it('throws NO_STORE_DEFINED', () => {
            store._resetStore();
            expect(store.getStore)
                .toThrow(new Error(store.ErrorCodes.NO_STORE_DEFINED));
        });
    });
});
