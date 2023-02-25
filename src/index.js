import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import * as store from './state/store';

import * as fcl from '@onflow/fcl';
import fclConfig from './fcl.config';

import * as app from './state/app/actions';

import { App } from './view/App';

import * as collection from './state/collection/actions';

fcl.config(fclConfig);

const rootElement = document.getElementById('root');
store.createStore();

// start by checking if already logged in
store.getStore().dispatch(app.init());

ReactDOM.render(
    <Provider store={store.getStore()}>
        <App />
        <button onClick={() => store.getStore().dispatch(collection.init())}
        >Init Colection</button>
    </Provider>,
    rootElement,
);
 