import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Icon from 'react-fa';
import ClassNames from 'classnames';
import DeepEqual from 'deep-equal';

import Select from '../Select/Select.js';

import './Player.less';

export default class Player extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */

		this.state = {
			playStatus: false,
			timerId: null,
		};
	}

	render() {

		/* Action */

		let action = null;

		if(this.state.playStatus)
		{
			action = (
				<Icon
					name="pause"
					fixedWidth
					onClick={() => {
						this.stop();
					}}
				/>
			);
		}
		else
		{
			action = (
				<Icon
					name="play"
					fixedWidth
					onClick={() => {
						this.start();
					}}
				/>
			);
		}

		/* Element */

		const element = (
			<div
				className={ClassNames('Player', [
					this.props.className,
				])}
			>
				<table>
					<tbody>
						<tr>
							<td
								className="action"
							>
								{action}
							</td>
							<td
								className="select"
							>
								<Select
									value={this.props.value}
									options={this.props.options}
									action={(value) => {
										this.props.action(value);
									}}
								/>
							</td>
						</tr>
					</tbody>
				</table>

			</div>
		);

		/* Return */

		return element;
	}

	componentWillUnmount() {

		/* Clear interval */

		clearInterval(this.state.timerId);
	}

	/* Specific */

	start() {

		/* Set interval */

		const timerId = setInterval(() => {
			this.goToNextValue();
		}, this.props.delay);

		/* Set state */

		this.setState({
			playStatus: true,
			timerId: timerId,
		});
	}

	stop() {

		/* Clear interval */

		clearInterval(this.state.timerId);

		/* Set state */

		this.setState({
			playStatus: false,
			timerId: null,
		});
	}

	goToNextValue() {
		const currentIndex = this.props.options.findIndex((element) => {
			return DeepEqual(element.value, this.props.value);
		});

		const validIndex = (currentIndex === -1) ? 0 : currentIndex;

		const newIndex = (validIndex + 1) % this.props.options.length;

		this.props.action(this.props.options[newIndex].value);
	}

};

Player.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	delay: PropTypes.number,

	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.bool,
	]).isRequired,
	options: PropTypes.array.isRequired,
	action: PropTypes.func.isRequired,
};

Player.defaultProps = {
	className: null,
	disabled: false,
	required: false,
	delay: 1000,
};
