import update from 'immutability-helper';

import { LOGIN_STARTED, LOGIN_SUCCESS } from 'modules/login/actions';

const initialState = {
	isBusy: false,
	error: false
};

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_STARTED:
			return update(state, { isBusy: { $set: true } });
		case LOGIN_SUCCESS:
			return update(state, { isBusy: { $set: false }, error: { $set: false } });
		default:
			return state;
	}
};

export default loginReducer;
