import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import * as store from './state/store';

import * as fcl from '@onflow/fcl';
import fclConfig from './fcl.config';

import { App } from './view/App';

import { initializeApp } from './state/compound-actions';

fcl.config(fclConfig);

const rootElement = document.getElementById('root');
store.createStore();

// start by checking if already logged in
store.getStore().dispatch(initializeApp());

ReactDOM.render(
    <Provider store={store.getStore()}>
        <App />
    </Provider>,
    rootElement,
);
