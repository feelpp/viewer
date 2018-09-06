import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Viewer from '../Viewer/Viewer.js';

import './Main.less';

export class Main extends Component {

	/* Generic */

	constructor(props) {
		super(props);
	}

	render() {

		/* Viewer */

		const viewer = (
			<Viewer
				data={this.props.data}
			/>
		);

		/* Element */

		const element = (
			<div className="Main">
				{viewer}
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

};

Main.propTypes = {
	data: PropTypes.string.isRequired,
};

Main.defaultProps = {
};

export default connect(
	(state) => {
		return {
			data: state.data,
		};
	}
)(Main);