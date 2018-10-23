import {
	SESSION_REFRESH_STARTED,
	SESSION_REFRESH_SUCCESS
} from 'modules/session/actions';
import { message } from 'antd';

export const sessionRefreshCall = () => (dispatch, getState) => {
	dispatch({ type: SESSION_REFRESH_STARTED });
	const reply = {
		session: {
			is_user_logged_in: true,
			lifetime: 3600,
			csrf_token: 'abcdef'
		}
	};
	setTimeout(() => {
		dispatch({ type: SESSION_REFRESH_SUCCESS, reply });
		message.success('Odświeżono czas sesji logowania.');
	}, 2000);
};
