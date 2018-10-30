import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';

import {reduceRootState} from '../../Reducers/root.js';

import configurationActions from '../../Actions/configuration/configuration.js';
import dataActions from '../../Actions/data/data.js';
import panelActions from '../../Actions/panel/panel.js';

import Main from './Main/Main.js';

import './Root.less';

export default class Root extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */

		/** Store **/

		this.store = createStore(reduceRootState);

		/* Initial values */

		/** Configuration **/

		this.store.dispatch(configurationActions.setConfiguration(this.props.configuration));

		/** Data **/

		this.store.dispatch(dataActions.setData(this.props.data));

		/** Initialization **/

		this.store.dispatch(panelActions.setOpenStatus(this.props.configuration.visualizationParameterEditor.initialOpenStatus));
	}

	render() {

		/* Element */

		const element = (
			<Provider store={this.store}>
				<Router>
					<div className="Root">
						<Main/>
					</div>
				</Router>
			</Provider>
		);

		/* Return */

		return element;
	}

	/* Specific */

}

Root.propTypes = {
	data: PropTypes.string.isRequired,
	configuration: PropTypes.object.isRequired,
};

Root.defaultProps = {
};