import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ClassNames from 'classnames';
import Icon from 'react-fa';

import './Panel.less';

export default class Panel extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */
	}

	render() {

		/* Header */

		const header = (
			<div
				className="header"
				onClick={() => {
					this.props.setOpenStatus(! this.props.openStatus);
				}}
			>
				<table>
					<tbody>
					<tr>
						<td className="text">
							Parameters
						</td>
						<td className="icon">
							<Icon
								name="bars"
								fixedWidth
							/>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		);

		/* Content */

		let content = null;

		if(this.props.openStatus)
		{
			content = (
				<div className="content">
					{this.props.children}
				</div>
			);
		}

		/* Element */

		const element = (
			<div
				className={ClassNames([
					'Panel',
					{
						open: this.props.openStatus,
					},
				])}
			>
				{header}
				{content}
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

}

Panel.propTypes = {
	openStatus: PropTypes.bool.isRequired,
	setOpenStatus: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

Panel.defaultProps = {
};