import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ClassNames from 'classnames';

import Toggle from '../Toggle/Toggle.js';

import './Switch.less';

export default class Switch extends Component {

	/* Generic */

	constructor(props) {
		super(props);
	}

	render() {

		/* Element */

		const element = (
			<div
				className={ClassNames('Switch', [
					this.props.className,
				])}
			>
				<Toggle
					value={this.props.value}
					disabled={this.props.disabled}
					action={(value) => {
						this.props.action(value);
					}}
				>
					{(this.props.value) ? 'On' : 'Off'}
				</Toggle>
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

};

Switch.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,

	value: PropTypes.bool.isRequired,
	action: PropTypes.func.isRequired,
};

Switch.defaultProps = {
	className: null,
	disabled: false,
};
