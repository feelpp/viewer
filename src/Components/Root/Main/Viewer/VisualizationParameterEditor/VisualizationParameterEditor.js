import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {filters, filterNames} from '../../../../../Others/filter.js';
import {formatExtensions, formatMIMETypes} from '../../../../../Others/format.js';

import {downloadImageURL} from '../../../../../Helpers/download.js';

import panelActions from '../../../../../Actions/panel/panel.js';
import visualizationParametersActions from '../../../../../Actions/visualizationParameters/visualizationParameters.js';
import filtersActions from '../../../../../Actions/visualizationParameters/filters/filters.js';

import ViewSection from './ViewSection/ViewSection.js';
import ColorMapSection from './ColorMapSection/ColorMapSection.js';
import CameraSection from './CameraSection/CameraSection.js';
import LegendSection from './LegendSection/LegendSection.js';
import GridSection from './GridSection/GridSection.js';
import Button from '../../../../Helpers/FormElements/Button/Button.js';
import Panel from '../../../../Helpers/Panel/Panel.js';
import PanelSection from '../../../../Helpers/Panel/PanelSection/PanelSection.js';
import Select from '../../../../Helpers/FormElements/Select/Select.js';
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
			<LegendSection/>
		);

		/** Grid **/

		const gridPanelSection = (
			<GridSection/>
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
		return {
			configuration: state.configuration,
			client: state.connection.client,
			openStatus: state.panel.openStatus,
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
			setBackgroundColor: (backgroundColor) => {
				dispatch(visualizationParametersActions.setBackgroundColor(backgroundColor));
			},
			setFilter: (filter) => {
				dispatch(filtersActions.setFilter(filter));
			},
		};
	}
)(VisualizationParameterEditor);