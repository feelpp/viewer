import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeepEqual from 'deep-equal';

import {colorMapPresets, colorMapPresetNames} from '../../../../../../Others/colorMap.js';

import colorMapActions from '../../../../../../Actions/visualizationParameters/colorMap/colorMap.js';

import Button from '../../../../../Helpers/FormElements/Button/Button.js';
import Input from '../../../../../Helpers/FormElements/Input/Input.js';
import PanelSection from '../../../../../Helpers/Panel/PanelSection/PanelSection.js';
import Select from '../../../../../Helpers/FormElements/Select/Select.js';
import Switch from '../../../../../Helpers/FormElements/Switch/Switch.js';

import './ColorMapSection.less';

export class ColorMapSection extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */

		this.state = {
			colorMapScaleInferiorValue: 0,
			colorMapScaleSuperiorValue: 0,
		};
	}

	render() {

		/* Element */

		const element = (
			<div
				className="ColorMapSection"
			>
				<PanelSection
					label="Color map"
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
									Color map
								</td>
								<td
									className="fieldEditor"
								>
									<Select
										value={this.props.colorMapPreset}
										options={Object.keys(colorMapPresets).map((colorMapPresetKey) => {
											return {
												text: colorMapPresetNames[colorMapPresets[colorMapPresetKey]],
												value: colorMapPresets[colorMapPresetKey],
											};
										})}
										action={(colorMapPreset) => {
											this.setColorMapPreset(colorMapPreset);
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
									Scale
								</td>
								<td
									className="fieldEditor"
								>
									<Input
										className="smallInput"
										type="number"
										placeholder="Inferior"
										value={this.state.colorMapScaleInferiorValue}
										action={(inferiorValue) => {
											this.setColorMapScale(inferiorValue, this.state.colorMapScaleSuperiorValue);
										}}
									/>
									<Input
										className="smallInput"
										type="number"
										placeholder="Superior"
										value={this.state.colorMapScaleSuperiorValue}
										action={(superiorValue) => {
											this.setColorMapScale(this.state.colorMapScaleInferiorValue, superiorValue);
										}}
									/>
									<Button
										action={() => {
											this.resetColorMapScale();
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
									LogScale
								</td>
								<td
									className="fieldEditor"
								>
									<Switch
										value={this.props.colorMapLogScaleStatus}
										action={(colorMapLogScaleStatus) => {
											this.setColorMapLogScaleStatus(colorMapLogScaleStatus);
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

	setColorMapPreset(colorMapPreset) {
		this.props.client.Viewer.setColorMapPreset(colorMapPreset).then((result) => {
			if(result.value)
			{
				this.props.setColorMapPreset(this.props.dataArray, colorMapPreset);
			}
		});
	}

	resetColorMapScale() {
		this.props.client.Viewer.resetColorMapScale();
	}

	setColorMapScale(inferiorValue, superiorValue) {
		this.setState({
			colorMapScaleInferiorValue: inferiorValue,
			colorMapScaleSuperiorValue: superiorValue,
		});

		this.props.client.Viewer.setColorMapScale(inferiorValue, superiorValue).then((result) => {
			if(! result.value)
			{
				this.setState({
					colorMapScaleInferiorValue: 0,
					colorMapScaleSuperiorValue: 0,
				});
			}
		});
	}

	setColorMapLogScaleStatus(colorMapLogScaleStatus) {
		this.props.client.Viewer.setColorMapLogScaleStatus(colorMapLogScaleStatus).then((result) => {
			if(result.value)
			{
				this.props.setColorMapLogScaleStatus(colorMapLogScaleStatus);
			}
		});
	}
}

ColorMapSection.propTypes = {
	initialOpenStatus: PropTypes.bool,

	client: PropTypes.object.isRequired,
	dataArray: PropTypes.object.isRequired,
	colorMapPreset: PropTypes.string.isRequired,
	setColorMapPreset: PropTypes.func.isRequired,
	colorMapLogScaleStatus: PropTypes.bool.isRequired,
	setColorMapLogScaleStatus: PropTypes.func.isRequired,
};

ColorMapSection.defaultProps = {
	initialOpenStatus: null,
};

export default connect(
	(state) => {

		/* ColorMapPreset */

		const colorMapPresetFound = state.visualizationParameters.colorMap.presets.find((colorMapPreset) => {
			return DeepEqual(colorMapPreset.dataArray, state.visualizationParameters.dataArray);
		});

		const colorMapPreset = (colorMapPresetFound) ? colorMapPresetFound.preset : colorMapPresets.coolToWarm;

		/* Return */

		return {
			initialOpenStatus: state.configuration.visualizationParameterEditor.sections.colorMap.initialOpenStatus,
			client: state.connection.client,
			dataArray: state.visualizationParameters.dataArray,
			colorMapPreset: colorMapPreset,
			colorMapLogScaleStatus: state.visualizationParameters.colorMap.logScaleStatus,
		};
	},
	(dispatch) => {
		return {
			setColorMapPreset: (dataArray, colorMapPreset) => {
				dispatch(colorMapActions.setPreset(dataArray, colorMapPreset));
			},
			setColorMapLogScaleStatus: (logScaleStatus) => {
				dispatch(colorMapActions.setLogScaleStatus(logScaleStatus));
			},
		};
	}
)(ColorMapSection);