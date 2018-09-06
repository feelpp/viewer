import configuration from './configuration.js';
import data from './data.js';
import connection from './connection.js';

export default function main(state = {}, action) {

	/* Return */

	return {
		configuration: configuration(state.configuration, action),
		data: data(state.data, action),
		connection: connection(state.connection, action),
	};
};