import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class HomePageClass extends React.Component {
	render() {
		return <div>---</div>;
	}
}

const HomePage = withRouter(connect()(HomePageClass));
export default HomePage;
