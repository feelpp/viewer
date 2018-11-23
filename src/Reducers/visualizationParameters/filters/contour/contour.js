export const contourInitialState = {
	data: null,
	values: null,
};

export function reduceContourState(state = contourInitialState, action) {
	if(action && action.type)
	{
		/* setData */

		if(action.type === 'visualizationParameters.filters.contour.setData')
		{
			return Object.assign({}, state, {
				data: action.data,
			});
		}

		/* setValues */

		if(action.type === 'visualizationParameters.filters.contour.setValues')
		{
			return Object.assign({}, state, {
				values: action.values,
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