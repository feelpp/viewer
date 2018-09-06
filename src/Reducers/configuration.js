const initialState = {};

export default function configuration(state = initialState, action) {
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
};