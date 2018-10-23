import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import homeReducer from 'modules/home/reducer';
import loginReducer from 'modules/login/reducer';
import sessionReducer from 'modules/session/reducer';

const appReducer = combineReducers({
	home: homeReducer,
	login: loginReducer,
	routing: routerReducer,
	session: sessionReducer
});

export const rootReducer = (state, action) => {
	return appReducer(state, action);
};
