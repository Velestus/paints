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
			collapsedMenu: true,
			current: 'home'
		};
	}

	componentDidMount() {
		let current;
		switch (this.props.location.pathname) {
			case '/':
				current = 'home';
				break;
			case '/certificates':
				current = 'certificates';
				break;
			case '/gallery':
				current = 'gallery';
				break;
			case '/contact':
				current = 'contact';
				break;
			default:
				current = '';
				break;
		}
		this.setState({
			current
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.pathname !== prevProps.pathname) {
			if (this.props.pathname === '/') {
				this.setState({
					current: 'home'
				});
			}
		}
	}

	toggleMenuVisibility = () => {
		this.setState(prevState => ({
			collapsedMenu: !prevState.collapsedMenu
		}));
	};

	handleLoginClick = () => {
		this.props.history.push({
			pathname: '/login'
		});
	};

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
				current: event.key,
				collapsedMenu: true
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
			case 'certificates':
				pathname = '/certificates';
				break;
			case 'gallery':
				pathname = '/gallery';
				break;
			case 'contact':
				pathname = '/contact';
				break;
			default:
				break;
		}
		this.props.history.push({ pathname });
	};

	render() {
		const { children, location, session } = this.props;

		let timer = <div />;

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
			<Menu className="App-dropdown">
				<Menu.Item key="settings" onClick={this.handleSettingsClick}>
					<Icon type="setting" /> Ustawienia
				</Menu.Item>
				{session.isUserLoggedIn && (
					<Menu.Item key="logout" onClick={() => this.props.logoutCall()}>
						<Icon type="logout" /> Wyloguj
					</Menu.Item>
				)}
				{!session.isUserLoggedIn && (
					<Menu.Item key="login" onClick={this.handleLoginClick}>
						<Icon type="login" /> Zaloguj
					</Menu.Item>
				)}
			</Menu>
		);
		const sessionTimer = (
			<div className="App-header-sessiontime">
				{session.isUserLoggedIn ? (
					<Button
						ghost
						shape="circle"
						icon="reload"
						className="App-header-sessiontime-button"
						onClick={() => this.props.sessionRefreshCall()}
					/>
				) : (
					<div />
				)}
				{timer}
				<Dropdown overlay={dropdownOptions} trigger={['click']}>
					<Icon type="caret-down" style={{ cursor: 'pointer' }} />
				</Dropdown>
			</div>
		);

		const menu = (
			<Layout.Sider
				trigger={null}
				collapsible
				collapsed={this.state.collapsedMenu}
				className="App-menu-wrapper"
			>
				<Menu
					onClick={this.handleMenuClick}
					selectedKeys={[this.state.current]}
					mode="inline"
					className="App-menu"
					theme="dark"
				>
					<Menu.Item key="home" className="App-menu-item">
						<Icon type="home" /> <span>Strona główna</span>
					</Menu.Item>
					<Menu.Item key="certificates" className="App-menu-item">
						<Icon type="database" /> <span>Certyfikaty</span>
					</Menu.Item>
					<Menu.Item key="gallery" className="App-menu-item">
						<Icon type="picture" /> <span>Galeria</span>
					</Menu.Item>
					<Menu.Item key="contact" className="App-menu-item">
						<Icon type="phone" /> <span>Kontakt</span>
					</Menu.Item>
				</Menu>
			</Layout.Sider>
		);

		const siderTrigger = (
			<Icon
				className="App-menu-trigger"
				type={this.state.collapsedMenu ? 'menu-unfold' : 'menu-fold'}
				onClick={this.toggleMenuVisibility}
			/>
		);

		let view;
		if (location.pathname === '/login') {
			view = children;
		} else {
			view = (
				<Layout>
					{menu}
					<Layout className="view">
						<Layout.Header className="App-header">
							{siderTrigger}
							{sessionTimer}
						</Layout.Header>
						<Layout.Content className="App-content">{children}</Layout.Content>
						<Layout.Footer className="App-footer">
							Nazwa produktu <Icon type="copyright" /> Napisał{' '}
							<span style={{ color: 'blue' }}>Bartosz Borawski</span>. Wszelkie
							prawa zastrzeżone.
						</Layout.Footer>
					</Layout>
				</Layout>
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
