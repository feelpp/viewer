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
			<FiltersSection/>
		);

		/** Others **/

		const othersPanelSection = (
			<OthersSection/>
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

}

VisualizationParameterEditor.propTypes = {
	openStatus: PropTypes.bool.isRequired,
	setOpenStatus: PropTypes.func.isRequired,
};

VisualizationParameterEditor.defaultProps = {
	screenShotGenerator: null,
};

export default connect(
	(state) => {
		return {
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