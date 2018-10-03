import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import panelActions from '../../../../../Actions/panel/panel.js';
import visualizationParametersActions from '../../../../../Actions/visualizationParameters/visualizationParameters.js';

import Button from '../../../../Helpers/FormElements/Button/Button.js';
import Panel from '../../../../Helpers/Panel/Panel.js';
import Player from '../../../../Helpers/FormElements/Player/Player.js';
import Select from '../../../../Helpers/FormElements/Select/Select.js';
import Switch from '../../../../Helpers/FormElements/Switch/Switch.js';

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
							<tr
								className="fieldLine"
							>
								<td
									className="fieldLabel"
								>
									Legend visibility
								</td>
								<td
									className="fieldEditor"
								>
									<Switch
										value={this.props.scaleBarVisibility}
										action={(scaleBarVisibility) => {
											this.setScaleBarVisibility(scaleBarVisibility);
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
									View
								</td>
								<td
									className="fieldEditor"
								>
									<Button
										className="blue"
										action={() => {
											this.resetView();
										}}
									>
										Reset
									</Button>
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

	resetView() {
		this.props.client.Viewer.resetView();
	}

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

	setScaleBarVisibility(scaleBarVisibility) {
		this.props.client.Viewer.setScaleBarVisibility(scaleBarVisibility).then((result) => {
			if(result.value)
			{
				this.props.setScaleBarVisibility(scaleBarVisibility);
			}
		});
	}
}

VisualizationParameterEditor.propTypes = {
	client: PropTypes.object.isRequired,
	openStatus: PropTypes.bool.isRequired,
	setOpenStatus: PropTypes.func.isRequired,
	dataArrays: PropTypes.array.isRequired,
	dataArray: PropTypes.object.isRequired,
	setDataArray: PropTypes.func.isRequired,
	representationTypes: PropTypes.array.isRequired,
	representationType: PropTypes.string.isRequired,
	setRepresentationType: PropTypes.func.isRequired,
	timeSteps: PropTypes.array.isRequired,
	timeStep: PropTypes.number.isRequired,
	setTimeStep: PropTypes.func.isRequired,
	scaleBarVisibility: PropTypes.bool.isRequired,
	setScaleBarVisibility: PropTypes.func.isRequired,
};

VisualizationParameterEditor.defaultProps = {
};

export default connect(
	(state) => {
		return {
			client: state.connection.client,
			openStatus: state.panel.openStatus,
			dataArrays: state.visualizationParameters.dataArrays,
			dataArray: state.visualizationParameters.dataArray,
			representationTypes: state.visualizationParameters.representationTypes,
			representationType: state.visualizationParameters.representationType,
			timeSteps: state.visualizationParameters.timeSteps,
			timeStep: state.visualizationParameters.timeStep,
			scaleBarVisibility: state.visualizationParameters.scaleBarVisibility,
		};
	},
	(dispatch) => {
		return {
			setOpenStatus: (openStatus) => {
				dispatch(panelActions.setOpenStatus(openStatus));
			},
			setDataArray: (dataArray) => {
				dispatch(visualizationParametersActions.setDataArray(dataArray));
			},
			setRepresentationType: (representationType) => {
				dispatch(visualizationParametersActions.setRepresentationType(representationType));
			},
			setTimeStep: (timeStep) => {
				dispatch(visualizationParametersActions.setTimeStep(timeStep));
			},
			setScaleBarVisibility: (scaleBarVisibility) => {
				dispatch(visualizationParametersActions.setScaleBarVisibility(scaleBarVisibility));
			},
		};
	}
)(VisualizationParameterEditor);