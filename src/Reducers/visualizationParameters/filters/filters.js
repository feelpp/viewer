import {filters} from '../../../Others/filter.js';

export const filtersInitialState = {
	filter: null,
	parameters: {
		[filters.warpByVector]: null,
	},
};

export function reduceFiltersState(state = filtersInitialState, action) {
	if(action && action.type)
	{
		/* setFilter */

		if(action.type === 'visualizationParameters.filters.setFilter')
		{
			return Object.assign({}, state, {
				filter: action.filter,
			});
		}

		/* setParameters */

		if(action.type === 'visualizationParameters.filters.setParameters')
		{
			return Object.assign({}, state, {
				parameters: Object.assign(state.parameters, {
					[action.filter]: action.parameters,
				}),
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