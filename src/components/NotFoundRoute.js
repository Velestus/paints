import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, Redirect } from "react-router-dom";

function mapStateToProps(state) {
	return {
		token: state.session.token,
		isUserLoggedIn: state.session.isUserLoggedIn,
	};
}
/* Jeśli jesteśmy niezalogowani i probujemy dobic sie do lokalizacji jakiej nie znamy to robimy redirecta na /login
	Jeśli jesteśmy zaś zalogowani i probujemy dobic sie do lokalizacji jakiej nie znamy to robimy redirecta na /
*/
const NotFoundRouteConst = ({ ...rest }) => (
	<Route
		{...rest}
		render={props =>
			rest.token && rest.isUserLoggedIn ? (
				<Redirect
					to={{
						pathname: "/",
						state: { from: props.location },
					}}
				/>
			) : (
				<Redirect
					to={{
						pathname: "/login",
						state: { from: props.location },
					}}
				/>
			)
		}
	/>
);

const NotFoundRoute = withRouter(
	connect(
		mapStateToProps,
		null,
	)(NotFoundRouteConst),
);

export default NotFoundRoute;
