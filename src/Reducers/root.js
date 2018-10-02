import {reduceConfigurationState} from './configuration/configuration.js';
import {reduceConnectionState} from './connection/connection.js';
import {reduceDataState} from './data/data.js';
import {reducePanelState} from './panel/panel.js';
import {reduceVisualizationParametersState} from './visualizationParameters/visualizationParameters.js';

export function reduceRootState(state = {}, action) {

	/* Return */

	return {
		configuration: reduceConfigurationState(state.configuration, action),
		connection: reduceConnectionState(state.connection, action),
		data: reduceDataState(state.data, action),
		panel: reducePanelState(state.panel, action),
		visualizationParameters: reduceVisualizationParametersState(state.visualizationParameters, action),
	};
}