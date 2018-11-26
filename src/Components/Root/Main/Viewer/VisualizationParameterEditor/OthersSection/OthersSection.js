import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {formatExtensions, formatMIMETypes} from '../../../../../../Others/format.js';

import {downloadImageURL} from '../../../../../../Helpers/download.js';

import visualizationParametersActions from '../../../../../../Actions/visualizationParameters/visualizationParameters.js';

import Button from '../../../../../Helpers/FormElements/Button/Button.js';
import PanelSection from '../../../../../Helpers/Panel/PanelSection/PanelSection.js';
import ValidationInput from '../../../../../Helpers/FormElements/ValidationInput/ValidationInput.js';

import './OthersSection.less';

export class OthersSection extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */
	}

	render() {

		/* Element */

		const element = (
			<div
				className="OthersSection"
			>
				<PanelSection
					label="Others"
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

OthersSection.propTypes = {
	initialOpenStatus: PropTypes.bool,
	screenShotGenerator: PropTypes.func,

	configuration: PropTypes.object.isRequired,
	client: PropTypes.object.isRequired,
	backgroundColor: PropTypes.string.isRequired,
	setBackgroundColor: PropTypes.func.isRequired,
};

OthersSection.defaultProps = {
	initialOpenStatus: null,
	screenShotGenerator: null,
};

export default connect(
	(state) => {
		return {
			initialOpenStatus: state.configuration.visualizationParameterEditor.sections.filters.initialOpenStatus,
			configuration: state.configuration,
			client: state.connection.client,
			backgroundColor: state.visualizationParameters.backgroundColor,
			screenShotGenerator: state.screenShotGenerator,
		};
	},
	(dispatch) => {
		return {
			setBackgroundColor: (backgroundColor) => {
				dispatch(visualizationParametersActions.setBackgroundColor(backgroundColor));
			},
		};
	}
)(OthersSection);