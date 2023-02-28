import ActionTypes from './rpg/action-types';
import * as actions from './rpg/actions';
import * as selectors from './rpg/selectors';

const exports = {
    ...actions,
    ...selectors,
};

exports.ActionTypes = ActionTypes;

export default exports;
