import {
	LOGIN_STARTED,
	LOGIN_SUCCESS,
	LOGOUT_STARTED,
	LOGOUT_SUCCESS
} from 'modules/login/actions';
import { push } from 'react-router-redux';
import { getStartPage } from 'modules/root/routing';

import { message } from 'antd';

export const loginCall = (login_id, password) => (dispatch, getState) => {
	const store = { dispatch, getState };

	dispatch({ type: LOGIN_STARTED });

	const reply = {
		session: {
			is_user_logged_in: true,
			lifetime: 3600,
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
export const logoutCall = snackbarData => (dispatch, getState) => {
	dispatch({ type: LOGOUT_STARTED });

	const reply = {};
	setTimeout(() => {
		dispatch({ type: LOGOUT_SUCCESS, reply });
		message.success('Nastąpiło poprawne wylogowanie.');
	}, 200);
};

function onUserLoggedIn(store) {
	const { dispatch, getState } = store;
	const startPagePath = getStartPage(getState());
	dispatch(push(startPagePath));
}
