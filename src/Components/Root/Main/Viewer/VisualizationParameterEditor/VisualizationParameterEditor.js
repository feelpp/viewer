import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import panelActions from '../../../../../Actions/panel.js';

import Panel from '../../../../Helpers/Panel/Panel.js';

import './VisualizationParameterEditor.less';

export class VisualizationParameterEditor extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */
	}

	render() {

		/* Element */

		const element = (
			<div className="VisualizationParameterEditor">
				<Panel
					openStatus={this.props.openStatus}
					setOpenStatus={(openStatus) => {
						this.props.setOpenStatus(openStatus);
					}}
				>
					<table
						className="fields"
					>
						<tbody>
							<tr>
								<td
									className="fieldLabel"
								>
									Representation type
								</td>
								<td
									className="fieldEditor"
								>
									Test
								</td>
							</tr>
						</tbody>
					</table>
				</Panel>
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

}

VisualizationParameterEditor.propTypes = {
	client: PropTypes.object.isRequired,
	openStatus: PropTypes.bool.isRequired,
	setOpenStatus: PropTypes.func.isRequired,
};

VisualizationParameterEditor.defaultProps = {
};

export default connect(
	(state) => {
		return {
			client: state.connection.client,
			openStatus: state.panel.openStatus,
		};
	},
	(dispatch) => {
		return {
			setOpenStatus: (openStatus) => {
				dispatch(panelActions.setOpenStatus(openStatus));
			},
		};
	}
)(VisualizationParameterEditor);