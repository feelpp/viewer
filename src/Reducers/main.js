import configuration from './configuration.js';
import connection from './connection.js';
import data from './data.js';
import panel from './panel.js';

export default function main(state = {}, action) {

	/* Return */

	return {
		configuration: configuration(state.configuration, action),
		connection: connection(state.connection, action),
		data: data(state.data, action),
		panel: panel(state.panel, action),
	};
};