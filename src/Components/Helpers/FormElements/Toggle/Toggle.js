import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ClassNames from 'classnames';

import Button from '../Button/Button.js';

import './Toggle.less';

export default class Toggle extends Component {

	/* Generic */

	constructor(props) {
		super(props);
	}

	render() {

		/* Element */

		const element = (
			<div
				className={ClassNames('Toggle', [
					this.props.className,
				])}
			>
				<Button
					className={(this.props.value) ? '' : 'grey'}
					disabled={this.props.disabled}
					action={() => {
						this.onClickAction();
					}}
				>
					{this.props.children}
				</Button>
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

	onClickAction() {
		if(this.props.action)
		{
			this.props.action(! this.props.value);
		}
	}
};

Toggle.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	action: PropTypes.func,

	value: PropTypes.bool.isRequired,
};

Toggle.defaultProps = {
	className: null,
	disabled: false,
	children: null,
	action: null,
};