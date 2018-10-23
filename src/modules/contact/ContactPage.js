import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function mapStateToProps(state) {
	return {
		pathname: state.routing.location.pathname
	};
}

class ContactPageClass extends React.Component {
	render() {
		return <div className="ContactPage">Contact</div>;
	}
}

const ContactPage = withRouter(connect(mapStateToProps)(ContactPageClass));
export default ContactPage;
