import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function mapStateToProps(state) {
	return {
		pathname: state.routing.location.pathname
	};
}

class SettingsPageClass extends React.Component {
	state = {
		response: ''
	};

	componentDidMount() {
		this.callApi()
			.then(res => this.setState({ response: res.express }))
			.catch(err => console.log(err));
	}

	callApi = async () => {
		const response = await fetch('/api/hello');
		const body = await response.json();

		if (response.status !== 200) throw Error(body.message);

		return body;
	};
	render() {
		return <div className="SettingsPage">{this.state.response}</div>;
	}
}

const SettingsPage = withRouter(connect(mapStateToProps)(SettingsPageClass));
export default SettingsPage;
