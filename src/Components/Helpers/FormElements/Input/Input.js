import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ClassNames from 'classnames';

import './Input.less';

export default class Input extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */

	}

	render() {

		/* Element */

		const element = (
			<div
				className={ClassNames('Input', [
					this.props.className,
				])}
			>
				<input
					className={ClassNames({
						invalid: this.props.checker && (this.props.checker(this.props.value) === false),
					})}
					type={this.props.type}
					value={this.props.value}
					step={(this.props.type === 'number') ? this.props.step : null}
					min={(this.props.type === 'number') ? this.props.min : null}
					max={(this.props.type === 'number') ? this.props.max : null}
					placeholder={this.props.placeholder}
					disabled={this.props.disabled}
					required={this.props.required}
					pattern={this.props.pattern}
					onChange={(event) => {
						this.onChangeAction(event);
					}}
				/>
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

	onChangeAction(event) {
		if(this.props.action)
		{
			if(this.props.type === 'text')
			{
				this.props.action(event.target.value);
			}
			else
			{
				this.props.action(Number(event.target.value));
			}
		}
	}
};

Input.propTypes = {
	className: PropTypes.string,
	type: PropTypes.oneOf([
		'text',
		'number',
	]),
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	step: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	pattern: PropTypes.string,
	checker: PropTypes.func,
	action: PropTypes.func,
};

Input.defaultProps = {
	className: null,
	type: 'text',
	placeholder: null,
	value: null,
	step: 1,
	min: null,
	max: null,
	disabled: false,
	required: false,
	pattern: null,
	checker: null,
	action: null,
};