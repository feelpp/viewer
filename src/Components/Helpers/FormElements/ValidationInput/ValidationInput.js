import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ClassNames from 'classnames';

import Button from '../Button/Button.js';

import './ValidationInput.less';

export default class ValidationInput extends Component {

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

		const invalidStatus = (this.props.checker !== null) && (this.props.checker(this.state.value) === false);

		const element = (
			<div
				className={ClassNames('ValidationInput', [
					this.props.className,
				])}
			>
				<input
					className={ClassNames({
						invalid: invalidStatus,
					})}
					type={this.props.type}
					value={this.state.value}
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
				<Button
					className="validationButton"
					disabled={invalidStatus}
					action={() => {
						if(this.props.action)
						{
							this.props.action(this.state.value);
						}
					}}
				>
					Apply
				</Button>
			</div>
		);

		/* Return */

		return element;
	}

	componentDidMount() {
		this.setState({
			value: this.props.value,
		});
	}

	componentDidUpdate(previousProps) {

		/* Value */

		if(this.props.value !== previousProps.value)
		{
			this.setState({
				value: this.props.value,
			});
		}
	}

	/* Specific */

	onChangeAction(event) {

		/* Get value */

		let value = null;

		if(this.props.type === 'text')
		{
			value = event.target.value;
		}
		else
		{
			value = Number(event.target.value);
		}

		/* Set value */

		this.setState({
			value: value,
		});
	}
};

ValidationInput.propTypes = {
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

ValidationInput.defaultProps = {
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