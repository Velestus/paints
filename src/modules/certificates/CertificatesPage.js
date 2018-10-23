import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function mapStateToProps(state) {
	return {
		pathname: state.routing.location.pathname
	};
}

class CertificatesPageClass extends React.Component {
	render() {
		return <div className="CertificatesPage">Certificates</div>;
	}
}

const CertificatesPage = withRouter(
	connect(mapStateToProps)(CertificatesPageClass)
);
export default CertificatesPage;
