import {filters} from '../../../Others/filter.js';

import {reduceWarpByVectorState, warpByVectorInitialState} from './warpByVector/warpByVector.js';
import {reduceContourState, contourInitialState} from './contour/contour.js';

export const filtersInitialState = {
	filter: null,
	parameters: {
		[filters.warpByVector]: warpByVectorInitialState,
		[filters.contour]: contourInitialState,
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

		/* Default */

		return Object.assign({}, state, {
			parameters: {
				[filters.warpByVector]: reduceWarpByVectorState(state.parameters[filters.warpByVector], action),
				[filters.contour]: reduceContourState(state.parameters[filters.contour], action),
			},
		});
	}
	else
	{
		return state;
	}
}