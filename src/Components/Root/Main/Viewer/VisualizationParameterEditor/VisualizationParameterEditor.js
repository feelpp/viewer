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
						</tbody>
					</table>
				</Panel>
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

	setRepresentationType(representationType) {
		this.props.client.Viewer.setRepresentationType(representationType).then((result) => {
			if(result.value)
			{
				this.props.setRepresentationType(representationType);
			}
		});
	}
}

VisualizationParameterEditor.propTypes = {
	client: PropTypes.object.isRequired,
	openStatus: PropTypes.bool.isRequired,
	setOpenStatus: PropTypes.func.isRequired,
	representationTypes: PropTypes.array.isRequired,
	representationType: PropTypes.string.isRequired,
	setRepresentationType: PropTypes.func.isRequired,
};

VisualizationParameterEditor.defaultProps = {
};

export default connect(
	(state) => {
		return {
			client: state.connection.client,
			openStatus: state.panel.openStatus,
			representationTypes: state.visualizationParameters.representationTypes,
			representationType: state.visualizationParameters.representationType,
		};
	},
	(dispatch) => {
		return {
			setOpenStatus: (openStatus) => {
				dispatch(panelActions.setOpenStatus(openStatus));
			},
			setRepresentationType: (representationType) => {
				dispatch(visualizationParametersActions.setRepresentationType(representationType));
			},
		};
	}
)(VisualizationParameterEditor);