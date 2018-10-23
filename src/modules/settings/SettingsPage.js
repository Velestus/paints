import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function mapStateToProps(state) {
	return {
		pathname: state.routing.location.pathname
	};
}

class SettingsPageClass extends React.Component {
	render() {
		return <div className="SettingsPage">---</div>;
	}
}

const SettingsPage = withRouter(connect(mapStateToProps)(SettingsPageClass));
export default SettingsPage;
