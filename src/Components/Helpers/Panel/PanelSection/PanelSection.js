import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Icon from 'react-fa';

import './PanelSection.less';

export default class PanelSection extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */

		this.state = {
			openStatus: this.props.initialOpenStatus,
		};
	}

	render() {

		/* Header */

		const header = (
			<div className="header">
				<table>
					<tbody>
						<tr
							onClick={() => {
								this.setState({
									openStatus: ! this.state.openStatus,
								});
							}}
						>
							<td className="label">
								{this.props.label}
							</td>
							<td className="icon">
								<Icon
									name={(this.state.openStatus) ? 'chevron-down' : 'chevron-up'}
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

		if(this.state.openStatus)
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
				className="PanelSection"
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

PanelSection.propTypes = {
	className: PropTypes.string,
	initialOpenStatus: PropTypes.bool,
	children: PropTypes.node,

	label: PropTypes.string.isRequired,
};

PanelSection.defaultProps = {
	className: null,
	initialOpenStatus: true,
	children: null,
};