import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ClassNames from 'classnames';

import './Select.less';

export default class Select extends Component {

	/* Generic */

	constructor(props) {
		super(props);
	}

	render() {

		/* Options */

		const options = this.props.options.map((option, index) => {
			return (
				<option
					key={index}
					value={option.value}
				>
					{option.text}
				</option>
			);
		});

		/* Element */

		const element = (
			<div className="Select">
				<select
					className={ClassNames({
						invalid: this.props.checker && (this.props.checker(this.props.value) === false),
					})}
					value={this.props.value}
					placeholder={this.props.placeholder}
					disabled={this.props.disabled}
					required={this.props.required}
					onChange={(event) => {
						this.onChangeAction(event);
					}}
				>
					{options}
				</select>
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

	onChangeAction(event) {
		if(this.props.action)
		{
			this.props.action(event.target.value);
		}
	}
};

Select.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	options: PropTypes.array,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	checker: PropTypes.func,
	action: PropTypes.func,
};

Select.defaultProps = {
	placeholder: null,
	value: null,
	options: [],
	disabled: false,
	required: false,
	checker: null,
	action: null,
};
