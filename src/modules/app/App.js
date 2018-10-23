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
			current: 'home'
		};
	}

	componentDidMount() {}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.pathname !== prevProps.pathname) {
			if (this.props.pathname === '/') {
				this.setState({
					current: 'home'
				});
			}
		}
	}
	handleSettingsClick = () => {
		this.setState({
			current: ''
		});
		this.props.history.push({
			pathname: '/settings'
		});
	};

	handleMenuClick = event => {
		this.setState(
			{
				current: event.key
			},
			() => this.handleTabChange(this.state.current)
		);
	};

	handleTabChange = key => {
		let pathname;
		switch (key) {
			case 'home':
				pathname = '/';
				break;
			case 'paints':
				pathname = '/paints';
				break;
			case 'gallery':
				pathname = '/gallery';
				break;
			case 'mail':
				pathname = '/contact';
				break;
			default:
				break;
		}
		this.props.history.push({ pathname });
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
				<Menu.Item key="settings" onClick={this.handleSettingsClick}>
					USTAWIENIA
				</Menu.Item>
				<Menu.Item key="logout" onClick={() => this.props.logoutCall()}>
					WYLOGUJ
				</Menu.Item>
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
				<Dropdown overlay={dropdownOptions} trigger={['click']}>
					<Icon type="caret-down" style={{ cursor: 'pointer' }} />
				</Dropdown>
			</div>
		);

		const menu = (
			<Menu
				onClick={this.handleMenuClick}
				selectedKeys={[this.state.current]}
				mode="horizontal"
				className="App-menu"
				theme="dark"
			>
				<Menu.Item key="home" className="App-menu-item">
					Strona główna
				</Menu.Item>
				<Menu.Item key="paints" className="App-menu-item">
					Baza farb
				</Menu.Item>
				<Menu.Item key="gallery" className="App-menu-item">
					Galeria
				</Menu.Item>
				<Menu.Item key="mail" className="App-menu-item">
					Kontakt
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
