import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import * as store from './state/store';

import * as fcl from '@onflow/fcl';
import fclConfig from './fcl.config';

import { App } from './view/App';

fcl.config(fclConfig);
store.createStore();

ReactDOM.render(
    <Provider store={store.getStore()}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
