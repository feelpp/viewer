import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import panelActions from '../../../../../Actions/panel/panel.js';
import visualizationParametersActions from '../../../../../Actions/visualizationParameters/visualizationParameters.js';

import Panel from '../../../../Helpers/Panel/Panel.js';
import Select from '../../../../Helpers/FormElements/Select/Select.js';

import './VisualizationParameterEditor.less';

export class VisualizationParameterEditor extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */

		this.state = {
			value: 50,
		};
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
									Data array
								</td>
								<td
									className="fieldEditor"
								>
									<Select
										value={this.props.dataArray}
										options={this.props.dataArrays.map((dataArray) => {
											return {
												text: dataArray.name,
												value: dataArray,
											};
										})}
										action={(dataArray) => {
											this.setDataArray(dataArray);
										}}
									/>
								</td>
							</tr>
							<tr>
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
							<tr>
								<td
									className="fieldLabel"
								>
									Time
								</td>
								<td
									className="fieldEditor"
								>
									<Select
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
									/>
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
		};
	}
)(VisualizationParameterEditor);