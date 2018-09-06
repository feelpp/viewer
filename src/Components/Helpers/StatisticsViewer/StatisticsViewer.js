import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ClassNames from 'classnames';

import './StatisticsViewer.less';

export default class StatisticsViewer extends Component {

	/* Generic */

	constructor(props) {
		super(props);
	}

	render() {

		/* FrameRate */

		let frameRate = null;

		const numberOfFrameRates = this.props.statistics.frameRates.length;

		if(numberOfFrameRates)
		{
			frameRate = this.props.statistics.frameRates[numberOfFrameRates - 1];
		}

		/* Element */

		const element = (
			<div
				className={ClassNames('StatisticsViewer', [
					this.props.className,
				])
			}>
				{frameRate}
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

};

StatisticsViewer.propTypes = {
	className: PropTypes.string,

	statistics: PropTypes.object.isRequired,
};

StatisticsViewer.defaultProps = {
	className: null,
};