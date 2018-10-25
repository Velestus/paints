import React from 'react';

export class VPageWrapper extends React.Component {
	render() {
		return <div className="VPageWrapper">{this.props.children}</div>;
	}
}
