import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ClassNames from 'classnames';

import ValidationInput from '../ValidationInput/ValidationInput.js';

import './ValidationListInput.less';

export default class ValidationListInput extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */

		this.state = {
			value: '',
		};
	}

	render() {

		/* Element */

		const element = (
			<div
				className={ClassNames('ValidationListInput', [
					this.props.className,
				])}
			>
				<ValidationInput
					type="text"
					placeholder={this.props.placeholder}
					value={this.props.values.join(', ')}
					disabled={this.props.disabled}
					required={this.props.required}
					action={(valuesText) => {
						if(this.props.action)
						{
							/* Compute Values */

							const values = valuesText
								.split(',')
								.map((value) => {
									return (this.props.type === 'text') ? value.trim() : Number(value);
								});

							/* Action */

							this.props.action(values)
						}
					}}
				/>
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */
};

ValidationListInput.propTypes = {
	className: PropTypes.string,
	type: PropTypes.oneOf([
		'text',
		'number',
	]),
	placeholder: PropTypes.string,
	values: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.number),
	]),
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	action: PropTypes.func,
};

ValidationListInput.defaultProps = {
	className: null,
	type: 'text',
	placeholder: null,
	values: [],
	disabled: false,
	required: false,
	action: null,
};