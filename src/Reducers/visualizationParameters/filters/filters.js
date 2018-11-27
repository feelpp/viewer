import {filters} from '../../../Others/filter.js';

import {reduceWarpByVectorState, warpByVectorInitialState} from './warpByVector/warpByVector.js';
import {reduceContourState, contourInitialState} from './contour/contour.js';
import {reduceCellDataToPointDataState, cellDataToPointDataInitialState} from './cellDataToPointData/cellDataToPointData.js';

export const filtersInitialState = {
	filter: null,
	parameters: {
		[filters.warpByVector]: warpByVectorInitialState,
	    [filters.contour]: contourInitialState,
            [filters.cellDataToPointData]: cellDataToPointDataInitialState,
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
                            [filters.cellDataToPointData]: reduceCellDataToPointDataState(state.parameters[filters.cellDataToPointData], action),
			},
		});
	}
	else
	{
		return state;
	}
}
