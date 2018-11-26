import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import gridActions from '../../../../../../Actions/visualizationParameters/grid/grid.js';

import PanelSection from '../../../../../Helpers/Panel/PanelSection/PanelSection.js';
import Switch from '../../../../../Helpers/FormElements/Switch/Switch.js';
import ValidationInput from '../../../../../Helpers/FormElements/ValidationInput/ValidationInput.js';

import './GridSection.less';

export class GridSection extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */
	}

	render() {

		/* Element */

		const element = (
			<div
				className="GridSection"
			>
				<PanelSection
					label="Grid"
					initialOpenStatus={this.props.initialOpenStatus}
				>
					<table
						className="fields"
					>
						<tbody>
							<tr
								className="fieldLine"
							>
								<td
									className="fieldLabel"
								>
									Display
								</td>
								<td
									className="fieldEditor"
								>
									<Switch
										value={this.props.gridDisplayStatus}
										action={(gridDisplayStatus) => {
											this.setGridDisplayStatus(gridDisplayStatus);
										}}
									/>
								</td>
							</tr>
							<tr
								className="fieldLine"
							>
								<td
									className="fieldLabel"
								>
									X axis title
								</td>
								<td
									className="fieldEditor"
								>
									<ValidationInput
										type="text"
										value={this.props.gridTitles.X}
										action={(gridTitle) => {
											this.setGridTitle('X', gridTitle);
										}}
									/>
								</td>
							</tr>
							<tr
								className="fieldLine"
							>
								<td
									className="fieldLabel"
								>
									Y axis title
								</td>
								<td
									className="fieldEditor"
								>
									<ValidationInput
										type="text"
										value={this.props.gridTitles.Y}
										action={(gridTitle) => {
											this.setGridTitle('Y', gridTitle);
										}}
									/>
								</td>
							</tr>
							<tr
								className="fieldLine"
							>
								<td
									className="fieldLabel"
								>
									Z axis title
								</td>
								<td
									className="fieldEditor"
								>
									<ValidationInput
										type="text"
										value={this.props.gridTitles.Z}
										action={(gridTitle) => {
											this.setGridTitle('Z', gridTitle);
										}}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</PanelSection>
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

	setGridDisplayStatus(gridDisplayStatus) {
		this.props.client.Viewer.setGridDisplayStatus(gridDisplayStatus).then((result) => {
			if(result.value)
			{
				this.props.setGridDisplayStatus(gridDisplayStatus);
			}
		});
	}

	setGridTitle(gridAxis, gridTitle) {
		this.props.client.Viewer.setGridTitle(gridAxis, gridTitle).then((result) => {
			if(result.value)
			{
				this.props.setGridTitle(gridAxis, gridTitle);
			}
		});
	}
}

GridSection.propTypes = {
	initialOpenStatus: PropTypes.bool,

	client: PropTypes.object.isRequired,
	gridDisplayStatus: PropTypes.bool.isRequired,
	setGridDisplayStatus: PropTypes.func.isRequired,
	gridTitles: PropTypes.object.isRequired,
	setGridTitle: PropTypes.func.isRequired,
};

GridSection.defaultProps = {
	initialOpenStatus: null,
};

export default connect(
	(state) => {
		return {
			initialOpenStatus: state.configuration.visualizationParameterEditor.sections.grid.initialOpenStatus,
			client: state.connection.client,
			openStatus: state.panel.openStatus,
			gridDisplayStatus: state.visualizationParameters.grid.displayStatus,
			gridTitles: state.visualizationParameters.grid.titles,
		};
	},
	(dispatch) => {
		return {
			setGridDisplayStatus: (displayStatus) => {
				dispatch(gridActions.setDisplayStatus(displayStatus));
			},
			setGridTitle: (axis, title) => {
				dispatch(gridActions.setTitle(axis, title));
			},
		};
	}
)(GridSection);