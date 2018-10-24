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
			<div className="sectionHeader">
				<table>
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
								name={(this.state.openStatus) ? 'chevron-up' : 'chevron-down'}
								fixedWidth
							/>
						</td>
					</tr>
				</table>
			</div>
		);

		/* Content */

		let content = null;

		if(this.state.openStatus)
		{
			content = (
				<div className="sectionContent">
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
	label: PropTypes.string.isRequired,

	initialOpenStatus: PropTypes.bool,
	children: PropTypes.node,
};

PanelSection.defaultProps = {
	initialOpenStatus: true,
	children: null,
};