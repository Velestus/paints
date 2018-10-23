import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppRoute from 'components/AppRoute';
import NotFoundRoute from 'components/NotFoundRoute';

import App from 'modules/app/App';
import HomePage from 'modules/home/HomePage';
import LoginPage from 'modules/login/LoginPage';

export const getRoutes = ({ dispatch, getState }) => {
	const route = (
		<App>
			<Switch>
				<AppRoute exact path="/" component={HomePage} />
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
