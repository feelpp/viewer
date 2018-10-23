import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Icon from 'react-fa';

import ViewerProtocol from '../../../../Others/ParaViewWebProtocols/Viewer.js';

import {Connection} from '../../../../Helpers/Connection.js';

import connectionActions from '../../../../Actions/connection/connection.js';
import visualizationParametersActions from '../../../../Actions/visualizationParameters/visualizationParameters.js';

import RemoteRenderer from '../../../Helpers/RemoteRenderer/RemoteRenderer.js';

import VisualizationParameterEditor from './VisualizationParameterEditor/VisualizationParameterEditor.js';

import './Viewer.less';

export class Viewer extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */

		this.connection = null;

		this.protocols = {
			native: [
				'MouseHandler',
				'ProxyManager',
				'ViewPort',
				'VtkImageDelivery',
			],
			custom: {
				Viewer: ViewerProtocol,
			},
		};
	}

	render() {

		let content = null;

		if(this.props.loadStatus)
		{
			content = (
				<div className="centeredContent">
					<Icon
						name="circle-o-notch"
						spin
					/>
				</div>
			);
		}
		else
		{
			if(this.props.client)
			{
				/* RemoteRenderer */

				const remoteRenderer = (
					<RemoteRenderer
						className="remoteRenderer"
						client={this.props.client}
						stillQuality={this.props.configuration.render.quality.still}
						interactiveQuality={this.props.configuration.render.quality.interactive}
						stillRatio={this.props.configuration.render.ratio.still}
						interactiveRatio={this.props.configuration.render.ratio.interactive}
						statisticsDisplayStatus={this.props.configuration.statisticsDisplayStatus}
					/>
				);

				/* VisualizationParameterEditor */

				let visualizationParameterEditor = null;

				if(this.props.configuration.visualizationParameterEditorDisplayStatus)
				{
					visualizationParameterEditor = (
						<VisualizationParameterEditor/>
					);
				}

				/* Content */

				content = (
					<div className="content">
						{remoteRenderer}
						{visualizationParameterEditor}
					</div>
				);
			}
			else
			{
				content = (
					<div className="centeredContent">
						<Icon
							name="exclamation-triangle"
						/>
					</div>
				);
			}
		}

		/* Element */

		const element = (
			<div className="Viewer">
				{content}
			</div>
		);

		/* Return */

		return element;
	}

	componentDidMount() {

		/* Create connection */

		this.connect();
	}

	componentWillUnmount() {

		/* Destroy connection */

		this.disconnect();
	}

	/* Specific */

	connect() {

		/* Set loadStatus */

		this.props.setLoadStatus(true);

		/* Initialize connection */

		this.connection = new Connection(
			this.props.configuration.connection.sessionManagerURL,
			this.protocols,
			{
				ready: (client) => {
					this.props.setClient(client);

					/* Load data */

					client.Viewer.loadFile(this.props.data).then((result) => {

						/* Other */

						if(result.value)
						{
							this.props.setDataArrays(result.data.dataArrays);
							this.props.setDataArray(result.data.dataArray);

							this.props.setRepresentationTypes(result.data.representationTypes);
							this.props.setRepresentationType(result.data.representationType);

							this.props.setTimeSteps(result.data.timeSteps);
							this.props.setTimeStep(result.data.timeStep);

							this.props.setScaleBarVisibility(result.data.scaleBarVisibility);

							this.props.setBackgroundColor(result.data.backgroundColor);
						}

						/* Load status */

						this.props.setLoadStatus(false);
					});
				},
				error: () => {
					this.props.setClient(false);
				},
				close: () => {
					this.props.setClient(false);
				},
			}
		);

		/* Trigger connection */

		this.connection.connect();
	}

	disconnect() {
		if(this.connection)
		{
			this.connection.disconnect(this.props.configuration.connection.timeout);
			this.props.setClient(false);
		}
	}
}

Viewer.propTypes = {
	client: PropTypes.object,

	configuration: PropTypes.object.isRequired,
	data: PropTypes.string.isRequired,
	loadStatus: PropTypes.bool.isRequired,
	setLoadStatus: PropTypes.func.isRequired,
	setClient: PropTypes.func.isRequired,
	setDataArrays: PropTypes.func.isRequired,
	setDataArray: PropTypes.func.isRequired,
	setRepresentationTypes: PropTypes.func.isRequired,
	setRepresentationType: PropTypes.func.isRequired,
	setTimeSteps: PropTypes.func.isRequired,
	setTimeStep: PropTypes.func.isRequired,
	setScaleBarVisibility: PropTypes.func.isRequired,
	setBackgroundColor: PropTypes.func.isRequired,
};

Viewer.defaultProps = {
};

export default connect(
	(state) => {
		return {
			configuration: state.configuration,
			data: state.data,
			loadStatus: state.connection.loadStatus,
			client: state.connection.client,
		};
	},
	(dispatch) => {
		return {
			setLoadStatus: (loadStatus) => {
				dispatch(connectionActions.setLoadStatus(loadStatus));
			},
			setClient: (client) => {
				dispatch(connectionActions.setClient(client));
			},
			setDataArrays: (dataArrays) => {
				dispatch(visualizationParametersActions.setDataArrays(dataArrays));
			},
			setDataArray: (dataArray) => {
				dispatch(visualizationParametersActions.setDataArray(dataArray));
			},
			setRepresentationTypes: (representationTypes) => {
				dispatch(visualizationParametersActions.setRepresentationTypes(representationTypes));
			},
			setRepresentationType: (representationType) => {
				dispatch(visualizationParametersActions.setRepresentationType(representationType));
			},
			setTimeSteps: (timeSteps) => {
				dispatch(visualizationParametersActions.setTimeSteps(timeSteps));
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
)(Viewer);