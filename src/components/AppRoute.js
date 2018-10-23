import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';

function mapStateToProps(state) {
	return {
		token: state.session.token,
		isUserLoggedIn: state.session.isUserLoggedIn
	};
}

const AppRouteConst = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			rest.token && rest.isUserLoggedIn ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/login',
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
);

const AppRoute = withRouter(
	connect(
		mapStateToProps,
		null
	)(AppRouteConst)
);

export default AppRoute;
