import React from 'react';
import PropTypes from 'prop-types';
import { formatSessionLifetime } from 'utils/formatters';

export class VSessionTimer extends React.Component {
	static propTypes = {
		sessionLifetime: PropTypes.number,
		sessionRefreshed: PropTypes.bool,
		logoutCall: PropTypes.func,
		sessionRefreshButtonCallback: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.state = {
			timer: null,
			counter: 0
		};

		this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		let timer = setInterval(this.tick, 1000);
		this.setState({ counter: this.props.sessionLifetime, timer });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.sessionRefreshed !== this.props.sessionRefreshed) {
			if (this.props.sessionRefreshed === true) {
				this.setState({
					counter: this.props.sessionLifetime
				});
			}
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);
	}

	tick() {
		const value = this.state.counter - 1;

		this.setState(prevState => ({
			counter: prevState.counter - 1
		}));

		if (process.env.NODE_ENV === 'development') {
			if (value === 31) {
				this.props.sessionRefreshButtonCallback();
			}
		}

		if (value === 30 || value === 15 || value === 10 || value === 5) {
			console.log('session ends soon');
		}

		if (value === 0) {
			clearInterval(this.state.timer);
			this.props.logoutCall();
		}
	}

	render() {
		return (
			<div style={{ fontFamily: 'monospace' }}>
				{formatSessionLifetime(this.state.counter)}
			</div>
		);
	}
}
