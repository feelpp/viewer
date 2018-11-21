import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import visualizationParametersActions from '../../../../../../Actions/visualizationParameters/visualizationParameters.js';

import PanelSection from '../../../../../Helpers/Panel/PanelSection/PanelSection.js';
import Player from '../../../../../Helpers/FormElements/Player/Player.js';
import Select from '../../../../../Helpers/FormElements/Select/Select.js';

import './ViewSection.less';

export class ViewSection extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */
	}

	render() {

		/* PanelSections */

		/** View **/

		const element = (
			<div
				className="ViewSection"
			>
				<PanelSection
					label="View"
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
									Data array
								</td>
								<td
									className="fieldEditor"
								>
									<Select
										value={this.props.dataArray}
										options={this.props.dataArrays.map((dataArray) => {
											return {
												text: dataArray.name + ' (' + dataArray.type + ')',
												value: dataArray,
											};
										})}
										action={(dataArray) => {
											this.setDataArray(dataArray);
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
									Representation type
								</td>
								<td
									className="fieldEditor"
								>
									<Select
										value={this.props.representationType}
										options={this.props.representationTypes.map((representationType) => {
											return {
												text: representationType,
												value: representationType,
											};
										})}
										action={(representationType) => {
											this.setRepresentationType(representationType);
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
									Time step
								</td>
								<td
									className="fieldEditor"
								>
									<Player
										value={this.props.timeStep}
										options={this.props.timeSteps.map((timeStep) => {
											return {
												text: timeStep,
												value: timeStep,
											};
										})}
										action={(timeStep) => {
											this.setTimeStep(Number(timeStep));
										}}
										delay={1000}
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

	setDataArray(dataArray) {
		this.props.client.Viewer.setDataArray(dataArray).then((result) => {
			if(result.value)
			{
				this.props.setDataArray(dataArray);
			}
		});
	}

	setRepresentationType(representationType) {
		this.props.client.Viewer.setRepresentationType(representationType).then((result) => {
			if(result.value)
			{
				this.props.setRepresentationType(representationType);
			}
		});
	}

	setTimeStep(timeStep) {
		this.props.client.Viewer.setTimeStep(timeStep).then((result) => {
			if(result.value)
			{
				this.props.setTimeStep(timeStep);
			}
		});
	}
}

ViewSection.propTypes = {
	initialOpenStatus: PropTypes.bool,

	client: PropTypes.object.isRequired,
	dataArrays: PropTypes.array.isRequired,
	dataArray: PropTypes.object.isRequired,
	setDataArray: PropTypes.func.isRequired,
	representationTypes: PropTypes.array.isRequired,
	representationType: PropTypes.string.isRequired,
	setRepresentationType: PropTypes.func.isRequired,
	timeSteps: PropTypes.array.isRequired,
	timeStep: PropTypes.number.isRequired,
	setTimeStep: PropTypes.func.isRequired,
};

ViewSection.defaultProps = {
	initialOpenStatus: null,
};

export default connect(
	(state) => {
		return {
			initialOpenStatus: state.configuration.visualizationParameterEditor.sectionInitialOpenStatus.view,
			client: state.connection.client,
			openStatus: state.panel.openStatus,
			dataArrays: state.visualizationParameters.dataArrays,
			dataArray: state.visualizationParameters.dataArray,
			representationTypes: state.visualizationParameters.representationTypes,
			representationType: state.visualizationParameters.representationType,
			timeSteps: state.visualizationParameters.timeSteps,
			timeStep: state.visualizationParameters.timeStep,
		};
	},
	(dispatch) => {
		return {

			setDataArray: (dataArray) => {
				dispatch(visualizationParametersActions.setDataArray(dataArray));
			},
			setRepresentationType: (representationType) => {
				dispatch(visualizationParametersActions.setRepresentationType(representationType));
			},
			setTimeStep: (timeStep) => {
				dispatch(visualizationParametersActions.setTimeStep(timeStep));
			},
		};
	}
)(ViewSection);