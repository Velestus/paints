import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppRoute from 'components/AppRoute';
import NotFoundRoute from 'components/NotFoundRoute';

import App from 'modules/app/App';
import HomePage from 'modules/home/HomePage';
import LoginPage from 'modules/login/LoginPage';
import SettingsPage from 'modules/settings/SettingsPage';

export const getRoutes = ({ dispatch, getState }) => {
	const route = (
		<App>
			<Switch>
				<AppRoute exact path="/" component={HomePage} />
				<AppRoute exact path="/settings" component={SettingsPage} />
				<Route path="/login" component={LoginPage} />
				<NotFoundRoute />
			</Switch>
		</App>
	);

	return route;
};

export const getStartPage = state => {
	// TODO: mogą pojawić się jakieś inne route'y po zalogowaniu, obsłuzymy to imho wtedy tutaj
	return '/';
};
