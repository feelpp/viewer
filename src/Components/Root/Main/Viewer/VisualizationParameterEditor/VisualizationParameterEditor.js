import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import panelActions from '../../../../../Actions/panel/panel.js';

import ViewSection from './ViewSection/ViewSection.js';
import ColorMapSection from './ColorMapSection/ColorMapSection.js';
import CameraSection from './CameraSection/CameraSection.js';
import LegendSection from './LegendSection/LegendSection.js';
import GridSection from './GridSection/GridSection.js';
import FiltersSection from './FiltersSection/FiltersSection.js';
import OthersSection from './OthersSection/OthersSection.js';
import Panel from '../../../../Helpers/Panel/Panel.js';

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

		let viewPanelSection = null;

		if(this.props.viewSectionEnableStatus)
		{
			viewPanelSection = (
				<ViewSection/>
			);
		}

		/** ColorMap **/

		let colorMapPanelSection = null;

		if(this.props.colorMapSectionEnableStatus)
		{
			colorMapPanelSection = (
				<ColorMapSection/>
			);
		}

		/** Camera **/

		let cameraPanelSection = null;

		if(this.props.cameraSectionEnableStatus)
		{
			cameraPanelSection = (
				<CameraSection/>
			);
		}

		/** Legend **/

		let legendPanelSection = null;

		if(this.props.legendSectionEnableStatus)
		{
			legendPanelSection = (
				<LegendSection/>
			);
		}

		/** Grid **/

		let gridPanelSection = null;

		if(this.props.gridSectionEnableStatus)
		{
			gridPanelSection = (
				<GridSection/>
			);
		}

		/** Filters **/

		let filtersPanelSection = null;

		if(this.props.filtersSectionEnableStatus)
		{
			filtersPanelSection = (
				<FiltersSection/>
			);
		}

		/** Others **/

		let othersPanelSection = null;

		if(this.props.othersSectionEnableStatus)
		{
			othersPanelSection = (
				<OthersSection/>
			);
		}

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

}

VisualizationParameterEditor.propTypes = {
	openStatus: PropTypes.bool.isRequired,
	setOpenStatus: PropTypes.func.isRequired,
	viewSectionEnableStatus: PropTypes.bool.isRequired,
	colorMapSectionEnableStatus: PropTypes.bool.isRequired,
	cameraSectionEnableStatus: PropTypes.bool.isRequired,
	legendSectionEnableStatus: PropTypes.bool.isRequired,
	gridSectionEnableStatus: PropTypes.bool.isRequired,
	filtersSectionEnableStatus: PropTypes.bool.isRequired,
	othersSectionEnableStatus: PropTypes.bool.isRequired,
};

VisualizationParameterEditor.defaultProps = {
	screenShotGenerator: null,
};

export default connect(
	(state) => {
		return {
			openStatus: state.panel.openStatus,
			viewSectionEnableStatus: state.configuration.visualizationParameterEditor.sections.view.enableStatus,
			colorMapSectionEnableStatus: state.configuration.visualizationParameterEditor.sections.colorMap.enableStatus,
			cameraSectionEnableStatus: state.configuration.visualizationParameterEditor.sections.camera.enableStatus,
			legendSectionEnableStatus: state.configuration.visualizationParameterEditor.sections.legend.enableStatus,
			gridSectionEnableStatus: state.configuration.visualizationParameterEditor.sections.grid.enableStatus,
			filtersSectionEnableStatus: state.configuration.visualizationParameterEditor.sections.filters.enableStatus,
			othersSectionEnableStatus: state.configuration.visualizationParameterEditor.sections.others.enableStatus,
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