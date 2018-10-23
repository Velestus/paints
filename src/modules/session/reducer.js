import update from 'immutability-helper';

import { LOGIN_SUCCESS } from 'modules/login/actions';

const initialState = {
	isUserLoggedIn: false,
	loggedInUserId: null,
	sessionLifetime: null,
	sessionRefreshed: false,
	sessionRefreshing: false,
	token: null
};

const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			const { reply } = action;
			return update(state, {
				isUserLoggedIn: { $set: reply.session.is_user_logged_in },
				loggedInUserId: { $set: reply.reply.user_id },
				sessionLifetime: { $set: reply.session.lifetime },
				token: { $set: reply.session.csrf_token },
				sessionRefreshed: { $set: true },
				sessionRefreshing: { $set: false }
			});
		default: {
			// return at the end of the function
		}
	}

	if (action.type.includes('STARTED')) {
		return update(state, {
			sessionRefreshed: { $set: false },
			sessionRefreshing: { $set: true }
		});
	}

	if (action.type.includes('SUCCESS')) {
		return update(state, {
			sessionRefreshed: { $set: true },
			sessionRefreshing: { $set: false }
		});
	}

	if (action.type.includes('ERROR')) {
		// FIXME ?
		return update(state, {
			sessionRefreshed: { $set: false },
			sessionRefreshing: { $set: false }
		});
	}

	return state;
};

export default sessionReducer;
