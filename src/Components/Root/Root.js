import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';

import main from '../../Reducers/main.js';

import configurationActions from '../../Actions/configuration.js';
import dataActions from '../../Actions/data.js';

import Main from '../Main/Main.js';

import './Root.less';

export default class Root extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */

		/** Store **/

		this.store = createStore(main);

		/* Initial values */

		this.store.dispatch(configurationActions.setConfiguration(this.props.configuration));
		this.store.dispatch(dataActions.setData(this.props.data));
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

};

Root.propTypes = {
	data: PropTypes.string.isRequired,
	configuration: PropTypes.object.isRequired,
};

Root.defaultProps = {
};