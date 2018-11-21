import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeepEqual from 'deep-equal';

import legendActions from '../../../../../../Actions/visualizationParameters/legend/legend.js';

import PanelSection from '../../../../../Helpers/Panel/PanelSection/PanelSection.js';
import Switch from '../../../../../Helpers/FormElements/Switch/Switch.js';
import ValidationInput from '../../../../../Helpers/FormElements/ValidationInput/ValidationInput.js';

import './LegendSection.less';

export class LegendSection extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */
	}

	render() {

		/* Element */

		const element = (
			<div
				className="LegendSection"
			>
				<PanelSection
					label="Legend"
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
}

LegendSection.propTypes = {
	initialOpenStatus: PropTypes.bool,

	client: PropTypes.object.isRequired,
	dataArray: PropTypes.object.isRequired,
	legendDisplayStatus: PropTypes.bool.isRequired,
	setLegendDisplayStatus: PropTypes.func.isRequired,
	legendTitle: PropTypes.string.isRequired,
	setLegendTitle: PropTypes.func.isRequired,
};

LegendSection.defaultProps = {
	initialOpenStatus: null,
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
			initialOpenStatus: state.configuration.visualizationParameterEditor.sectionInitialOpenStatus.legend,
			client: state.connection.client,
			dataArray: state.visualizationParameters.dataArray,
			legendTitle: legendTitle,
			legendDisplayStatus: state.visualizationParameters.legend.displayStatus,
		};
	},
	(dispatch) => {
		return {
			setLegendDisplayStatus: (displayStatus) => {
				dispatch(legendActions.setDisplayStatus(displayStatus));
			},
			setLegendTitle: (dataArray, title) => {
				dispatch(legendActions.setTitle(dataArray, title));
			},
		};
	}
)(LegendSection);