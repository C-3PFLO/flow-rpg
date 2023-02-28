import ActionTypes from './collections/action-types';
import * as actions from './collections/actions';
import * as selectors from './collections/selectors';

const exports = {
    ...actions,
    ...selectors,
};

exports.ActionTypes = ActionTypes;

export default exports;
