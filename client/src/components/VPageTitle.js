import React from 'react';
import PropTypes from 'prop-types';

export class VPageTitle extends React.Component {
	static sizes = ['mini', 'default', 'large'];

	static propTypes = {
		size: PropTypes.oneOf(VPageTitle.sizes)
	};

	static defaultProps = {
		size: 'default'
	};

	render() {
		let classNameToPass = 'VPageTitle';
		let { className, size, ...props } = this.props;

		if (size) {
			switch (size) {
				case 'mini':
					classNameToPass += ` ${classNameToPass}-mini`;
					break;
				case 'large':
					classNameToPass += ` ${classNameToPass}-large`;
					break;
				default:
					break;
			}
		}
		if (className) {
			classNameToPass = `${classNameToPass} ${className}`;
		}

		return <div className={classNameToPass} {...props} />;
	}
}
