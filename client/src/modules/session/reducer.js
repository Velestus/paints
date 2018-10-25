import update from 'immutability-helper';

import {
	SESSION_CANCELLED,
	SESSION_CLOSED,
	SESSION_REFRESH_STARTED,
	SESSION_REFRESH_SUCCESS
} from 'modules/session/actions';

import {
	LOGIN_SUCCESS,
	LOGOUT_STARTED,
	LOGOUT_SUCCESS,
	USER_AUTO_LOGOUT
} from 'modules/login/actions';

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
		case SESSION_REFRESH_STARTED:
			return update(state, {
				sessionRefreshed: { $set: false },
				sessionRefreshing: { $set: true }
			});
		case SESSION_REFRESH_SUCCESS:
			return update(state, {
				isUserLoggedIn: { $set: action.reply.session.is_user_logged_in },
				sessionLifetime: { $set: action.reply.session.lifetime },
				sessionRefreshed: { $set: true },
				sessionRefreshing: { $set: false },
				token: { $set: action.reply.session.csrf_token }
			});
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
		case LOGOUT_STARTED:
		case LOGOUT_SUCCESS:
		case SESSION_CANCELLED:
		case SESSION_CLOSED:
		case USER_AUTO_LOGOUT:
			return initialState;
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
