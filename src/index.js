import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import * as store from './state/store';

import * as fcl from '@onflow/fcl';

import { App } from './view/App';

fcl.config({
    'accessNode.api': 'http://localhost:8080',
    'discovery.wallet': 'http://localhost:8701/fcl/authn', // dev wallet
});

const rootElement = document.getElementById('root');
store.createStore();

ReactDOM.render(
    <Provider store={store.getStore()}>
        <App />
    </Provider>,
    rootElement,
);
