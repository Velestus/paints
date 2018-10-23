import { push } from "react-router-redux";
import { includes } from "lodash";

import {
	LOGOUT_SUCCESS,
	LOGOUT_ERROR,
	USER_AUTO_LOGOUT,
} from "modules/login/actions";
import { INTERNAL_ERROR } from "modules/root/actions";
import {
	SESSION_CLOSED,
	SESSION_CANCELLED,
	SESSION_REFRESH_ERROR,
} from "modules/session/actions";

const LOGOUT_ACTIONS = [
	LOGOUT_SUCCESS,
	LOGOUT_ERROR,
	USER_AUTO_LOGOUT,
	SESSION_CLOSED,
	SESSION_CANCELLED,
	SESSION_REFRESH_ERROR,
	INTERNAL_ERROR,
];

export const autoLogout = store => next => action => {
	if (includes(LOGOUT_ACTIONS, action.type)) {
		next(push("/login"));
	}
	return next(action);
};
