/**
* Defines the app reducer
*
* @module reducer
*/

import * as redux from 'redux';

import * as app from './app/reducer.js';
import * as collections from './collections/reducer.js';
import * as rpg from './rpg/reducer.js';

export default redux.combineReducers({
    app: app.reduce,
    collections: collections.reduce,
    rpg: rpg.reduce,
});
