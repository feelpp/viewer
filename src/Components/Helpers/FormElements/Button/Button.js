import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ClassNames from 'classnames';

import './Button.less';

export default class Button extends Component {

	/* Generic */

	constructor(props) {
		super(props);
	}

	render() {

		/* Element */

		const element = (
			<div
				className={ClassNames('Button', [
					this.props.className
				])}
			>
				<button
					style={this.props.style}
					disabled={this.props.disabled}
					onClick={() => {
						this.onClickAction();
					}}
				>
					{this.props.children}
				</button>
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

	onClickAction() {
		if(this.props.action)
		{
			this.props.action();
		}
	}
};

Button.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	disabled: PropTypes.bool,
	action: PropTypes.func,
};

Button.defaultProps = {
	className: '',
	style: null,
	children: null,
	disabled: false,
	action: null,
};