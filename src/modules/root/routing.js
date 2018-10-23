import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppRoute from 'components/AppRoute';
import NotFoundRoute from 'components/NotFoundRoute';

import App from 'modules/app/App';
import ContactPage from 'modules/contact/ContactPage';
import GalleryPage from 'modules/gallery/GalleryPage';
import HomePage from 'modules/home/HomePage';
import LoginPage from 'modules/login/LoginPage';
import CertificatesPage from 'modules/certificates/CertificatesPage';
import SettingsPage from 'modules/settings/SettingsPage';

export const getRoutes = ({ dispatch, getState }) => {
	const route = (
		<App>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/contact" component={ContactPage} />
				<Route exact path="/gallery" component={GalleryPage} />
				<Route exact path="/certificates" component={CertificatesPage} />
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
