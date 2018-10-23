import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function mapStateToProps(state) {
	return {
		pathname: state.routing.location.pathname
	};
}

class AppClass extends React.Component {
	render() {
		const { children, location } = this.props;

		let view;
		if (location.pathname === '/login') {
			view = children;
		} else {
			view = (
				<div className="view">
					<header className="App-header">Header</header>
					{children}
				</div>
			);
		}

		return <div className="App">{view}</div>;
	}
}

const App = withRouter(connect(mapStateToProps)(AppClass));
export default App;
