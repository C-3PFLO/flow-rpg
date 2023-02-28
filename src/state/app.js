import ActionTypes from './app/action-types';
import * as actions from './app/actions';
import * as selectors from './app/selectors';

const exports = {
    ...actions,
    ...selectors,
};

exports.ActionTypes = ActionTypes;

export default exports;
