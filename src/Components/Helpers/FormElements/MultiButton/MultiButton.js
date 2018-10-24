import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ClassNames from 'classnames';

import Button from '../Button/Button.js';

import './MultiButton.less';

export default class MultiButton extends Component {

	/* Generic */

	constructor(props) {
		super(props);
	}

	render() {

		/* Element */

		const element = (
			<div
				className={ClassNames('MultiButton', [
					this.props.className,
				])}
			>
				{
					this.props.options.map((optionValue, optionIndex) => {
						return (
							<Button
								className="multiButton"
								key={optionIndex}
								disabled={this.props.disabled}
								action={() => {
									this.onClickAction(optionValue.value);
								}}
							>
								{optionValue.text}
							</Button>
						);
					})
				}
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

	onClickAction(value) {
		if(this.props.action)
		{
			this.props.action(value);
		}
	}
};

MultiButton.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			text: PropTypes.string.isRequired,
			value: PropTypes.any.isRequired,
		}),
	),
	action: PropTypes.func,
};

MultiButton.defaultProps = {
	className: null,
	children: null,
	disabled: false,
	action: null,
};