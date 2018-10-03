import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ClassNames from 'classnames';

import Select from '../Select/Select.js';

import './Switch.less';

export default class Switch extends Component {

	/* Generic */

	constructor(props) {
		super(props);
	}

	render() {

		/* Element */

		console.log(this.props.value);

		const element = (
			<div
				className={ClassNames('Switch', [
					this.props.className,
				])}
			>
				<Select
					value={this.props.value}
					options={[
						{
							text: 'On',
							value: true,
						},
						{
							text: 'Off',
							value: false,
						},
					]}
					disabled={this.props.disabled}
					required={this.props.required}
					action={(value) => {
						this.props.action(value);
					}}
				/>
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
	required: PropTypes.bool,

	value: PropTypes.bool.isRequired,
	action: PropTypes.func.isRequired,
};

Switch.defaultProps = {
	className: null,
	disabled: false,
	required: false,
};
