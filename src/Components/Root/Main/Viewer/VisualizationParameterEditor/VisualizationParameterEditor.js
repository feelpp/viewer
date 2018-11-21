import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeepEqual from 'deep-equal';

import {filters, filterNames} from '../../../../../Others/filter.js';
import {formatExtensions, formatMIMETypes} from '../../../../../Others/format.js';

import {downloadImageURL} from '../../../../../Helpers/download.js';

import panelActions from '../../../../../Actions/panel/panel.js';
import visualizationParametersActions from '../../../../../Actions/visualizationParameters/visualizationParameters.js';
import legendActions from '../../../../../Actions/visualizationParameters/legend/legend.js';
import gridActions from '../../../../../Actions/visualizationParameters/grid/grid.js';
import filtersActions from '../../../../../Actions/visualizationParameters/filters/filters.js';

import ViewSection from './ViewSection/ViewSection.js';
import ColorMapSection from './ColorMapSection/ColorMapSection.js';
import CameraSection from './CameraSection/CameraSection.js';
import Button from '../../../../Helpers/FormElements/Button/Button.js';
import Panel from '../../../../Helpers/Panel/Panel.js';
import PanelSection from '../../../../Helpers/Panel/PanelSection/PanelSection.js';
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

		/* PanelSections */

		/** View **/

		const viewPanelSection = (
			<ViewSection/>
		);

		/** ColorMap **/

		const colorMapPanelSection = (
			<ColorMapSection/>
		);

		/** Camera **/

		const cameraPanelSection = (
			<CameraSection/>
		);

		/** Legend **/

		const legendPanelSection = (
			<PanelSection
				label="Legend"
				initialOpenStatus={this.props.configuration.visualizationParameterEditor.sectionInitialOpenStatus.legend}
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
									value={this.props.legendDisplayStatus}
									action={(legendDisplayStatus) => {
										this.setLegendDisplayStatus(legendDisplayStatus);
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
								Title
							</td>
							<td
								className="fieldEditor"
							>
								<ValidationInput
									type="text"
									value={this.props.legendTitle}
									action={(legendTitle) => {
										this.setLegendTitle(legendTitle);
									}}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</PanelSection>
		);

		/** Grid **/

		const gridPanelSection = (
			<PanelSection
				label="Grid"
				initialOpenStatus={this.props.configuration.visualizationParameterEditor.sectionInitialOpenStatus.grid}
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
		);

		/** Filters **/

		const filtersPanelSection = (
			<PanelSection
				label="Filters"
				initialOpenStatus={this.props.configuration.visualizationParameterEditor.sectionInitialOpenStatus.filters}
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
								Filter
							</td>
							<td
								className="fieldEditor"
							>
								<Select
									value={this.props.filter}
									options={[
										{
											text: 'No filter',
											value: null,
										},
										{
											text: filterNames[filters.warpByVector],
											value: filters.warpByVector,
										},
									]}
									action={(filter) => {
										this.setFilter(filter);
									}}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</PanelSection>
		);

		/** Others **/

		const othersPanelSection = (
			<PanelSection
				label="Others"
				initialOpenStatus={this.props.configuration.visualizationParameterEditor.sectionInitialOpenStatus.others}
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
						<tr
							className="fieldLine"
						>
							<td
								className="fieldLabel"
							>
								Screenshot
							</td>
							<td
								className="fieldEditor"
							>
								<Button
									disabled={this.props.screenShotGenerator === null}
									action={() => {
										this.downloadScreenShot();
									}}
								>
									Download
								</Button>
							</td>
						</tr>
					</tbody>
				</table>
			</PanelSection>
		);

		/* Element */

		const element = (
			<div className="VisualizationParameterEditor">
				<Panel
					openStatus={this.props.openStatus}
					setOpenStatus={(openStatus) => {
						this.props.setOpenStatus(openStatus);
					}}
				>
					{viewPanelSection}
					{colorMapPanelSection}
					{cameraPanelSection}
					{legendPanelSection}
					{gridPanelSection}
					{filtersPanelSection}
					{othersPanelSection}
				</Panel>
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

	setLegendDisplayStatus(legendDisplayStatus) {
		this.props.client.Viewer.setLegendDisplayStatus(legendDisplayStatus).then((result) => {
			if(result.value)
			{
				this.props.setLegendDisplayStatus(legendDisplayStatus);
			}
		});
	}

	setLegendTitle(legendTitle) {
		this.props.client.Viewer.setLegendTitle(legendTitle).then((result) => {
			if(result.value)
			{
				this.props.setLegendTitle(this.props.dataArray, legendTitle);
			}
		});
	}

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

	setBackgroundColor(backgroundColor) {
		this.props.client.Viewer.setBackgroundColor(backgroundColor).then((result) => {
			if(result.value)
			{
				this.props.setBackgroundColor(backgroundColor);
			}
		});
	}

	setFilter(filter) {
		this.props.setFilter(filter);
	}

	downloadScreenShot() {
		const format = this.props.configuration.screenShot.format;
		const quality = this.props.configuration.screenShot.quality;

		const MIMEType = formatMIMETypes[format];
		const extension = formatExtensions[format];

		const screenShotURL = this.props.screenShotGenerator(MIMEType, quality);

		if(screenShotURL)
		{
			downloadImageURL(screenShotURL, 'screenshot.' + extension, MIMEType);
		}
	}
}

VisualizationParameterEditor.propTypes = {
	screenShotGenerator: PropTypes.func,

	configuration: PropTypes.object.isRequired,
	client: PropTypes.object.isRequired,
	openStatus: PropTypes.bool.isRequired,
	setOpenStatus: PropTypes.func.isRequired,
	dataArray: PropTypes.object.isRequired,
	legendDisplayStatus: PropTypes.bool.isRequired,
	setLegendDisplayStatus: PropTypes.func.isRequired,
	legendTitle: PropTypes.string.isRequired,
	setLegendTitle: PropTypes.func.isRequired,
	gridDisplayStatus: PropTypes.bool.isRequired,
	setGridDisplayStatus: PropTypes.func.isRequired,
	gridTitles: PropTypes.object.isRequired,
	setGridTitle: PropTypes.func.isRequired,
	backgroundColor: PropTypes.string.isRequired,
	setBackgroundColor: PropTypes.func.isRequired,
	filter: PropTypes.string,
	setFilter: PropTypes.func.isRequired,
};

VisualizationParameterEditor.defaultProps = {
	screenShotGenerator: null,
};

export default connect(
	(state) => {

		/* LegendTitle */

		const legendTitleFound = state.visualizationParameters.legend.titles.find((legendTitle) => {
			return DeepEqual(legendTitle.dataArray, state.visualizationParameters.dataArray);
		});

		const legendTitle = (legendTitleFound) ? legendTitleFound.title : '';

		/* Return */

		return {
			configuration: state.configuration,
			client: state.connection.client,
			openStatus: state.panel.openStatus,
			dataArray: state.visualizationParameters.dataArray,
			legendTitle: legendTitle,
			legendDisplayStatus: state.visualizationParameters.legend.displayStatus,
			gridDisplayStatus: state.visualizationParameters.grid.displayStatus,
			gridTitles: state.visualizationParameters.grid.titles,
			backgroundColor: state.visualizationParameters.backgroundColor,
			filter: state.visualizationParameters.filters.filter,
			screenShotGenerator: state.screenShotGenerator,
		};
	},
	(dispatch) => {
		return {
			setOpenStatus: (openStatus) => {
				dispatch(panelActions.setOpenStatus(openStatus));
			},
			setLegendDisplayStatus: (displayStatus) => {
				dispatch(legendActions.setDisplayStatus(displayStatus));
			},
			setLegendTitle: (dataArray, title) => {
				dispatch(legendActions.setTitle(dataArray, title));
			},
			setGridDisplayStatus: (displayStatus) => {
				dispatch(gridActions.setDisplayStatus(displayStatus));
			},
			setGridTitle: (axis, title) => {
				dispatch(gridActions.setTitle(axis, title));
			},
			setBackgroundColor: (backgroundColor) => {
				dispatch(visualizationParametersActions.setBackgroundColor(backgroundColor));
			},
			setFilter: (filter) => {
				dispatch(filtersActions.setFilter(filter));
			},
		};
	}
)(VisualizationParameterEditor);