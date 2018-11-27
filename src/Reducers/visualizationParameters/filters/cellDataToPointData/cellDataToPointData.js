export const cellDataToPointDataInitialState = {
	data: null,
	values: null,
};

export function reduceCellDataToPointDataState(state = cellDataToPointDataInitialState, action) {
	if(action && action.type)
	{
		/* setData */

		if(action.type === 'visualizationParameters.filters.cellDataToPointData.setData')
		{
			return Object.assign({}, state, {
				data: action.data,
			});
		}

		/* setValues */

		if(action.type === 'visualizationParameters.filters.cellDataToPointData.setValues')
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
