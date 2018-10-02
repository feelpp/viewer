const visualizationParametersInitialState = {
	representationTypes: [],
	representationType: null,
};

export function reduceVisualizationParametersState(state = visualizationParametersInitialState, action) {
	if(action && action.type)
	{
		/* setRepresentationTypes */

		if(action.type === 'visualizationParameters.setRepresentationTypes')
		{
			return Object.assign({}, state, {
				representationTypes: action.representationTypes,
			});
		}

		/* setRepresentationType */

		if(action.type === 'visualizationParameters.setRepresentationType')
		{
			return Object.assign({}, state, {
				representationType: action.representationType,
			});
		}

		/* Default */

		return state;
	}
	else
	{
		return state;
	}
}