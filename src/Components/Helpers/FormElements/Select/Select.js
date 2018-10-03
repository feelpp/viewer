import PropTypes from 'prop-types';
import React, {Component} from 'react';
import DeepEqual from 'deep-equal';
import ClassNames from 'classnames';

import './Select.less';

export default class Select extends Component {

	/* Generic */

	constructor(props) {
		super(props);
	}

	render() {

		/* Options */

		const options = this.props.options.map((optionValue, optionIndex) => {
			return (
				<option
					key={optionIndex}
					value={optionIndex}
				>
					{optionValue.text}
				</option>
			);
		});

		/* Element */

		const index = this.props.options.findIndex((element) => {
			return DeepEqual(element.value, this.props.value);
		});

		const value = (index !== -1) ? index : '';

		const element = (
			<div
				className={ClassNames('Select', [
					this.props.className,
				])}
			>
				<select
					value={value}
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
			this.props.action(this.props.options[Number(event.target.value)].value);
		}
	}
};

Select.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.bool,
	]),
	options: PropTypes.array,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	action: PropTypes.func,
};

Select.defaultProps = {
	className: null,
	placeholder: null,
	value: null,
	options: [],
	disabled: false,
	required: false,
	action: null,
};
