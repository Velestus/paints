import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import { Form, Icon, Input, Button } from 'antd';

import * as ActionCreators from 'modules/login/actionCreators';

function mapStateToProps(state) {
	return {
		loginData: state.login
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			...ActionCreators
		},
		dispatch
	);
}

class LoginPageClass extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			usernameError: false,
			passwordError: false,
			errorMessage: 'Login/hasło są wymagane',
			submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({
			username: '12345678',
			password: '12345678'
		});
	}

	handleChange(e, props) {
		const { name, value } = props;

		if (name === 'username') this.setState({ usernameError: false });
		if (name === 'password') this.setState({ passwordError: false });

		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		const { username, password } = this.state;

		if (username === '') this.setState({ usernameError: true });
		if (password === '') this.setState({ passwordError: true });
		if (username !== '') this.setState({ usernameError: false });
		if (password !== '') this.setState({ passwordError: false });

		if (username && password) {
			this.setState({ submitted: true });
			this.props.loginCall(username, password);
		} else {
			console.error('Login/hasło są wymagane.');
		}
	}

	componentWillUnmount() {
		this.setState({ username: '', password: '', submitted: false });
	}

	render() {
		const { loginData } = this.props;
		return (
			<div className="LoginPage-Wrapper">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Username"
							onChange={this.handleChange}
							value={this.state.username}
						/>
					</Form.Item>
					<Form.Item>
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="Password"
							onChange={this.handleChange}
							value={this.state.password}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							htmlType="submit"
							className="login-form-button"
							icon="login"
							loading={loginData.isBusy}
						>
							Zaloguj
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

const LoginPage = withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(LoginPageClass)
);
export default LoginPage;
