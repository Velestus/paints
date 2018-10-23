import { LOGIN_STARTED, LOGIN_SUCCESS } from 'modules/login/actions';
import { push } from 'react-router-redux';
import { getStartPage } from 'modules/root/routing';

export const loginCall = (login_id, password) => (dispatch, getState) => {
	const store = { dispatch, getState };

	dispatch({ type: LOGIN_STARTED });

	const reply = {
		session: {
			is_user_logged_in: true,
			sessionLifetime: 3600,
			csrf_token: 'abcdef'
		},
		reply: {
			user_id: login_id
		}
	};
	setTimeout(() => {
		dispatch({ type: LOGIN_SUCCESS, reply });
		onUserLoggedIn(store);
	}, 2000);
};

function onUserLoggedIn(store) {
	const { dispatch, getState } = store;
	const startPagePath = getStartPage(getState());
	dispatch(push(startPagePath));
}
