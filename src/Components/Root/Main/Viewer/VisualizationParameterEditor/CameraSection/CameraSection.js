import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../../../../Helpers/FormElements/Button/Button.js';
import MultiButton from '../../../../../Helpers/FormElements/MultiButton/MultiButton.js';
import PanelSection from '../../../../../Helpers/Panel/PanelSection/PanelSection.js';

import './CameraSection.less';

export class CameraSection extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */
	}

	render() {

		/* Element */

		const element = (
			<div
				className="CameraSection"
				>
				<PanelSection
					label="Camera"
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
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

	resetView() {
		this.props.client.Viewer.resetView();
	}

	setCameraPosition(cameraPosition) {
		this.props.client.Viewer.setCameraPosition(cameraPosition);
	}
}

CameraSection.propTypes = {
	initialOpenStatus: PropTypes.bool,

	client: PropTypes.object.isRequired,
};

CameraSection.defaultProps = {
	initialOpenStatus: null,
};

export default connect(
	(state) => {
		return {
			initialOpenStatus: state.configuration.visualizationParameterEditor.sectionInitialOpenStatus.camera,
			client: state.connection.client,
		};
	}
)(CameraSection);