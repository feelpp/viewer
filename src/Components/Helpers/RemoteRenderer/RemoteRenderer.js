import PropTypes from 'prop-types';
import React, {Component} from 'react';
import RandomString from 'randomstring';
import ClassNames from 'classnames';
import ElementResizeDetector from 'element-resize-detector';
import WslinkImageStream from 'paraviewweb/src/IO/WebSocket/WslinkImageStream';
import VtkWebMouseListener from 'paraviewweb/src/Interaction/Core/VtkWebMouseListener';

import {ImageRenderer} from '../../../Helpers/ImageRenderer.js';

import StatisticsViewer from '../StatisticsViewer/StatisticsViewer.js';

import './RemoteRenderer.less';

export default class RemoteRenderer extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */

		this.containerId = RandomString.generate();
		this.container = null;
		this.binaryImageStream = null;
		this.mouseListener = null;
		this.imageRenderer = null;
		this.interactionStatus = null;

		this.state = {
			statistics: {
				frameRates: [],
				imageSizes: [],
				workTimes: [],
			},
		};
	}

	render() {

		let statisticsViewer = null;

		if(this.props.statisticsDisplayStatus)
		{
			statisticsViewer = (
				<StatisticsViewer
					className="statisticsViewer"
					statistics={this.state.statistics}
				/>
			);
		}

		/* Element */

		const element = (
			<div
				className={ClassNames('RemoteRenderer', [
					this.props.className,
				])
			}>
				{statisticsViewer}
				<div
					id={this.containerId}
					className="renderer"
				/>
			</div>
		);

		/* Return */

		return element;
	}

	componentDidMount() {

		/* Container */

		this.container = document.getElementById(this.containerId);

		/* Initialize visualization */

		this.initializeVisualization();
	}

	componentWillUnmount() {

		/* Reset Visualization */

		this.resetVisualization();
	}

	componentDidUpdate(previousProps) {

		/* ViewId */

		if(this.props.viewId !== previousProps.viewId)
		{
			this.updateViewId(this.props.viewId);
		}

		/* Quality */

		if((this.props.stillQuality !== previousProps.stillQuality) || (this.props.interactiveQuality !== previousProps.interactiveQuality))
		{
			this.updateQuality(this.props.stillQuality, this.props.interactiveQuality);
		}

		/* Ratio */

		if((this.props.stillRatio !== previousProps.stillRatio) || (this.props.interactiveRatio !== previousProps.interactiveRatio))
		{
			this.updateRatio(this.props.stillRatio, this.props.interactiveRatio);
		}

		/* ThrottleTime */

		if(this.props.throttleTime !== previousProps.throttleTime)
		{
			this.updateThrottleTime(this.props.throttleTime);
		}

		/* FrameRateMax */

		if(this.props.frameRateMax !== previousProps.frameRateMax)
		{
			this.updateFrameRateMax(this.props.frameRateMax);
		}
	}

	/* Specific */

	initializeVisualization() {

		/* BinaryImageStream */

		this.binaryImageStream = WslinkImageStream.newInstance({
			client: this.props.client,
		});

		this.updateQuality();
		this.updateRatio();
		this.updateFrameRateMax();

		/* MouseListener */

		this.mouseListener = new VtkWebMouseListener(this.props.client);

		this.mouseListener.onInteraction((interactionStatus) => {
			if(this.interactionStatus !== interactionStatus)
			{
				this.interactionStatus = interactionStatus;

				if(interactionStatus)
				{
					this.binaryImageStream.startInteractiveQuality();
				}
				else
				{
					this.binaryImageStream
						.stopInteractiveQuality()
						.then(this.binaryImageStream.invalidateCache);

					setTimeout(
						this.binaryImageStream.invalidateCache,
						this.props.interactionTimeout
					);
				}
			}
		});

		this.updateThrottleTime();

		/* ImageRenderer */

		this.imageRenderer = new ImageRenderer(
			this.container,
			this.binaryImageStream,
			this.mouseListener.getListeners(),
			(statistics) => {
				this.addStatistics(statistics);
			}
		);

		/* Start */

		this.binaryImageStream
			.connect({
				view_id: parseInt(this.props.viewId),
			})
			.then(() => {
				this.resizeCallback();
			});

		/* Initialize reSizing */

		this.elementResizeDetector = ElementResizeDetector();

		this.elementResizeDetector.listenTo(this.container, () => {
			this.resizeCallback();
		});

		/* Initialize sizing */

		this.resizeCallback();
	}

	resetVisualization() {

		/* BinaryImageStream */

		if(this.binaryImageStream)
		{
			this.binaryImageStream.destroy();
			this.binaryImageStream = null;
		}

		/* MouseListener */

		if(this.mouseListener)
		{
			this.mouseListener.destroy();
			this.mouseListener = null;
		}

		/* ImageRenderer */

		if(this.imageRenderer)
		{
			this.imageRenderer.destroy();
			this.imageRenderer = null;
		}

		/* ReSizing */

		this.elementResizeDetector.removeAllListeners(this.container);
		this.elementResizeDetector = null;
	}

	addStatistics(statistics) {
		this.setState({
			statistics: {
				frameRates: [...this.state.statistics.frameRates, statistics.frameRate],
				imageSizes: [...this.state.statistics.imageSizes, statistics.imageSize],
				workTimes: [...this.state.statistics.workTimes, statistics.workTime],
			},
		});
	}
	
	updateViewId() {
		//TODO
	}
	
	updateQuality(stillQuality = this.props.stillQuality, interactiveQuality = this.props.interactiveQuality) {
		if(this.binaryImageStream)
		{
			this.binaryImageStream.updateQuality(stillQuality, interactiveQuality);
		}
	}
	
	updateRatio(stillRatio = this.props.stillRatio, interactiveRatio = this.props.interactiveRatio) {
		if(this.binaryImageStream)
		{
			this.binaryImageStream.updateResolutionRatio(stillRatio, interactiveRatio);
		}
	}

	updateThrottleTime(throttleTime = this.props.throttleTime) {
		if(this.mouseListener)
		{
			this.mouseListener.setThrottleTime(throttleTime);
		}
	}

	updateFrameRateMax(frameRateMax = this.props.frameRateMax) {
		if(this.binaryImageStream)
		{
			this.binaryImageStream.setMaxFrameRate(frameRateMax);
		}
	}

	resizeCallback() {
		if(this.container)
		{
			const containerDimensions = this.container.getBoundingClientRect();

			if(containerDimensions)
			{
				/* ImageRenderer */

				this.imageRenderer.updateSize({
					width: containerDimensions.width,
					height: containerDimensions.height,
				});

				/* BinaryImageStream */

				if(this.binaryImageStream)
				{
					this.binaryImageStream.setViewSize(containerDimensions.width, containerDimensions.height);
					this.binaryImageStream.invalidateCache();
				}
			}
		}
	}
};

RemoteRenderer.propTypes = {
	className: PropTypes.string,
	viewId: PropTypes.string,
	interactionTimeout: PropTypes.number,
	stillQuality: PropTypes.number,
	interactiveQuality: PropTypes.number,
	stillRatio: PropTypes.number,
	interactiveRatio: PropTypes.number,
	throttleTime: PropTypes.number,
	frameRateMax: PropTypes.number,
	statisticsDisplayStatus: PropTypes.bool,

	client: PropTypes.object.isRequired,
};

RemoteRenderer.defaultProps = {
	className: null,
	viewId: '-1',
	interactionTimeout: 500,
	stillQuality: 100,
	interactiveQuality: 50,
	stillRatio: 1,
	interactiveRatio: 0.5,
	throttleTime: 16.6,
	frameRateMax: 30,
	statisticsDisplayStatus: false,
};