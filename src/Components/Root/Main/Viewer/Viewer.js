import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Icon from 'react-fa';

import ViewerProtocol from '../../../../Others/ParaViewWebProtocols/Viewer.js';

import {Connection} from '../../../../Helpers/Connection.js';

import connectionActions from '../../../../Actions/connection.js';

import RemoteRenderer from '../../../Helpers/RemoteRenderer/RemoteRenderer.js';

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

		this.state = {
			orientationAxesVisibilityStatus: true,
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

				/* Content */

				content = (
					<div className="content">
						{remoteRenderer}
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
					this.props.setLoadStatus(false);

					/* Load data */

					client.Viewer.loadFile(this.props.data);
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
};

Viewer.propTypes = {
	client: PropTypes.object,

	configuration: PropTypes.object.isRequired,
	data: PropTypes.string.isRequired,
	loadStatus: PropTypes.bool.isRequired,
	setLoadStatus: PropTypes.func.isRequired,
	setClient: PropTypes.func.isRequired,
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
		};
	}
)(Viewer);