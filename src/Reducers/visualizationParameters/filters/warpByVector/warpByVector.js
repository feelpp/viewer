export const warpByVectorInitialState = {
	scaleFactor: null,
	vectors: null,
};

export function reduceWarpByVectorState(state = warpByVectorInitialState, action) {
	if(action && action.type)
	{
		/* setVectors */

		if(action.type === 'visualizationParameters.filters.warpByVector.setVectors')
		{
			return Object.assign({}, state, {
				vectors: action.vectors,
			});
		}

		/* setScaleFactor */

		if(action.type === 'visualizationParameters.filters.warpByVector.setScaleFactor')
		{
			return Object.assign({}, state, {
				scaleFactor: action.scaleFactor,
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