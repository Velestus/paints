import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import { Button, Dropdown, Icon, Layout, Menu } from 'antd';

import { VSessionTimer } from 'components';

import { logoutCall } from 'modules/login/actionCreators';
import { sessionRefreshCall } from 'modules/session/actionCreators';

function mapStateToProps(state) {
	return {
		pathname: state.routing.location.pathname,
		session: state.session
	};
}

class AppClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 'mail'
		};
	}

	handleMenuClick = event => {
		this.setState({
			current: event.key
		});
	};

	render() {
		const { children, location, session } = this.props;

		let timer = null;

		if (session.sessionLifetime !== null) {
			timer = (
				<VSessionTimer
					sessionLifetime={session.sessionLifetime}
					sessionRefreshed={session.sessionRefreshed}
					logoutCall={this.props.logoutCall}
					sessionRefreshButtonCallback={() => this.props.sessionRefreshCall()}
				/>
			);
		}

		const dropdownOptions = (
			<Menu>
				<Menu.Item>USTAWIENIA</Menu.Item>
				<Menu.Item>WYLOGUJ</Menu.Item>
			</Menu>
		);
		const sessionTimer = (
			<div className="App-header-sessiontime">
				<Button
					ghost
					shape="circle"
					icon="reload"
					className="App-header-sessiontime-button"
					onClick={() => this.props.sessionRefreshCall()}
				/>
				{timer}
				<Dropdown overlay={dropdownOptions}>
					<Icon type="caret-down" />
				</Dropdown>
			</div>
		);

		const menu = (
			<Menu
				onClick={this.handleMenuClick}
				selectedKeys={[this.state.current]}
				mode="horizontal"
				theme="dark"
			>
				<Menu.Item key="mail" className="App-menu-item">
					Navigation One
				</Menu.Item>
				<Menu.Item key="app" className="App-menu-item">
					Navigation Two
				</Menu.Item>
			</Menu>
		);

		let view;
		if (location.pathname === '/login') {
			view = children;
		} else {
			view = (
				<div className="view">
					<Layout.Header className="App-header">
						{menu}
						{sessionTimer}
					</Layout.Header>
					<Layout.Content>{children}</Layout.Content>
				</div>
			);
		}

		return <Layout className="App">{view}</Layout>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logoutCall,
			sessionRefreshCall
		},
		dispatch
	);
}

const App = withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(AppClass)
);
export default App;
