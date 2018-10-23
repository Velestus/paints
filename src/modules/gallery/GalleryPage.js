import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function mapStateToProps(state) {
	return {
		pathname: state.routing.location.pathname
	};
}

class GalleryPageClass extends React.Component {
	render() {
		return <div className="GalleryPage">Gallery</div>;
	}
}

const GalleryPage = withRouter(connect(mapStateToProps)(GalleryPageClass));
export default GalleryPage;
