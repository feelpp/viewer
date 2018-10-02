const configurationInitialState = {};

export function reduceConfigurationState(state = configurationInitialState, action) {
	if(action && action.type)
	{
		/* setConfiguration */

		if(action.type === 'configuration.setConfiguration')
		{
			return action.configuration;
		}

		/* Default */

		return state;
	}
	else
	{
		return state;
	}
}