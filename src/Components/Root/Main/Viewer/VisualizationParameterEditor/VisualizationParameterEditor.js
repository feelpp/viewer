import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeepEqual from 'deep-equal';

import {colorMaps, colorMapNames} from '../../../../../Others/colorMap.js';

import panelActions from '../../../../../Actions/panel/panel.js';
import visualizationParametersActions from '../../../../../Actions/visualizationParameters/visualizationParameters.js';

import Button from '../../../../Helpers/FormElements/Button/Button.js';
import MultiButton from '../../../../Helpers/FormElements/MultiButton/MultiButton.js';
import Panel from '../../../../Helpers/Panel/Panel.js';
import PanelSection from '../../../../Helpers/Panel/PanelSection/PanelSection.js';
import Player from '../../../../Helpers/FormElements/Player/Player.js';
import Select from '../../../../Helpers/FormElements/Select/Select.js';
import Switch from '../../../../Helpers/FormElements/Switch/Switch.js';
import ValidationInput from '../../../../Helpers/FormElements/ValidationInput/ValidationInput.js';

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
					<PanelSection
						label="View"
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
					<PanelSection
						label="Color map"
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
										Color map
									</td>
									<td
										className="fieldEditor"
									>
										<Select
											value={this.props.colorMap}
											options={Object.keys(colorMaps).map((colorMapKey) => {
												return {
													text: colorMapNames[colorMaps[colorMapKey]],
													value: colorMaps[colorMapKey],
												};
											})}
											action={(colorMap) => {
												this.setColorMap(colorMap);
											}}
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</PanelSection>
					<PanelSection
						label="Camera"
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
										View
									</td>
									<td
										className="fieldEditor"
									>
										<Button
											action={() => {
												this.resetView();
											}}
										>
											Reset
										</Button>
									</td>
								</tr>
								<tr
									className="fieldLine"
								>
									<td
										className="fieldLabel"
									>
										Camera
									</td>
									<td
										className="fieldEditor"
									>
										<MultiButton
											options={[
												{
													text: '+X',
													value: '+X',
												},
												{
													text: '-X',
													value: '-X',
												},
												{
													text: '+Y',
													value: '+Y',
												},
												{
													text: '-Y',
													value: '-Y',
												},
												{
													text: '+Z',
													value: '+Z',
												},
												{
													text: '-Z',
													value: '-Z',
												},
											]}
											action={(cameraPosition) => {
												this.setCameraPosition(cameraPosition);
											}}
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</PanelSection>
					<PanelSection
						label="Legend"
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
							</tbody>
						</table>
					</PanelSection>
					<PanelSection
						label="Others"
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
										Background
									</td>
									<td
										className="fieldEditor"
									>
										<ValidationInput
											type="text"
											value={this.props.backgroundColor}
											checker={(backgroundColor) => {
												return /[A-Fa-f0-9]{6}/.test(backgroundColor)
											}}
											action={(backgroundColor) => {
												this.setBackgroundColor(backgroundColor);
											}}
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</PanelSection>
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

	setColorMap(colorMap) {
		this.props.client.Viewer.setColorMap(colorMap).then((result) => {
			if(result.value)
			{
				this.props.setColorMap(this.props.dataArray, colorMap);
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

	setCameraPosition(cameraPosition) {
		this.props.client.Viewer.setCameraPosition(cameraPosition);
	}

	setBackgroundColor(backgroundColor) {
		this.props.client.Viewer.setBackgroundColor(backgroundColor).then((result) => {
			if(result.value)
			{
				this.props.setBackgroundColor(backgroundColor);
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
	colorMap: PropTypes.string.isRequired,
	setColorMap: PropTypes.func.isRequired,
	timeSteps: PropTypes.array.isRequired,
	timeStep: PropTypes.number.isRequired,
	setTimeStep: PropTypes.func.isRequired,
	scaleBarVisibility: PropTypes.bool.isRequired,
	setScaleBarVisibility: PropTypes.func.isRequired,
	backgroundColor: PropTypes.string.isRequired,
	setBackgroundColor: PropTypes.func.isRequired,
};

VisualizationParameterEditor.defaultProps = {
};

export default connect(
	(state) => {

		/* ColorMap */

		const colorMapFound = state.visualizationParameters.colorMaps.find((colorMap) => {
			return DeepEqual(colorMap.dataArray, state.visualizationParameters.dataArray);
		});

		const colorMap = (colorMapFound) ? colorMapFound.colorMap : colorMaps.coolToWarm;

		/* Return */

		return {
			client: state.connection.client,
			openStatus: state.panel.openStatus,
			dataArrays: state.visualizationParameters.dataArrays,
			dataArray: state.visualizationParameters.dataArray,
			representationTypes: state.visualizationParameters.representationTypes,
			representationType: state.visualizationParameters.representationType,
			colorMap: colorMap,
			timeSteps: state.visualizationParameters.timeSteps,
			timeStep: state.visualizationParameters.timeStep,
			scaleBarVisibility: state.visualizationParameters.scaleBarVisibility,
			backgroundColor: state.visualizationParameters.backgroundColor,
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
			setColorMap: (dataArray, colorMap) => {
				dispatch(visualizationParametersActions.setColorMap(dataArray, colorMap));
			},
			setTimeStep: (timeStep) => {
				dispatch(visualizationParametersActions.setTimeStep(timeStep));
			},
			setScaleBarVisibility: (scaleBarVisibility) => {
				dispatch(visualizationParametersActions.setScaleBarVisibility(scaleBarVisibility));
			},
			setBackgroundColor: (backgroundColor) => {
				dispatch(visualizationParametersActions.setBackgroundColor(backgroundColor));
			},
		};
	}
)(VisualizationParameterEditor);