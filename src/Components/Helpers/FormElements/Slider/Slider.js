import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ClassNames from 'classnames';

import './Slider.less';

export default class Slider extends Component {

	/* Generic */

	constructor(props) {
		super(props);
	}

	render() {

		/* Element */

		const element = (
			<div
				className={ClassNames('Slider', [
					this.props.className,
				])}
			>
				<input
					type="range"
					value={this.props.value}
					step={this.props.step}
					min={this.props.min}
					max={this.props.max}
					disabled={this.props.disabled}
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
			this.props.action(Number(event.target.value));
		}
	}
};

Slider.propTypes = {
	className: PropTypes.string,
	value: PropTypes.number,
	step: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	disabled: PropTypes.bool,
	action: PropTypes.func,
};

Slider.defaultProps = {
	className: null,
	type: 'text',
	value: null,
	step: 1,
	min: 0,
	max: 100,
	disabled: false,
	action: null,
};