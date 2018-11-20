import {reduceColorMapState, colorMapInitialState} from './colorMap/colorMap.js';
import {reduceFiltersState, filtersInitialState} from './filters/filters.js';
import {reduceLegendState, legendInitialState} from './legend/legend.js';
import {reduceGridState, gridInitialState} from './grid/grid.js';

const visualizationParametersInitialState = {
	editorDisplayStatus: false,
	dataArrays: [],
	dataArray: null,
	representationTypes: [],
	representationType: null,
	colorMap: colorMapInitialState,
	grid: gridInitialState,
	legend: legendInitialState,
	timeSteps: [],
	timeStep: null,
	backgroundColor: null,
	filters: filtersInitialState,
};

export function reduceVisualizationParametersState(state = visualizationParametersInitialState, action) {
	if(action && action.type)
	{
		/* set */

		if(action.type === 'visualizationParameters.set')
		{
			return Object.assign({}, state, {
				[action.field]: action.value,
			});
		}

		/* setDataArrays */

		if(action.type === 'visualizationParameters.setDataArrays')
		{
			return Object.assign({}, state, {
				dataArrays: action.dataArrays,
			});
		}

		/* setEditorDisplayStatus */

		if(action.type === 'visualizationParameters.setEditorDisplayStatus')
		{
			return Object.assign({}, state, {
				editorDisplayStatus: action.editorDisplayStatus,
			});
		}

		/* setDataArray */

		if(action.type === 'visualizationParameters.setDataArray')
		{
			return Object.assign({}, state, {
				dataArray: action.dataArray,
			});
		}

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

		/* setTimeSteps */

		if(action.type === 'visualizationParameters.setTimeSteps')
		{
			return Object.assign({}, state, {
				timeSteps: action.timeSteps,
			});
		}

		/* setTimeStep */

		if(action.type === 'visualizationParameters.setTimeStep')
		{
			return Object.assign({}, state, {
				timeStep: action.timeStep,
			});
		}

		/* setBackgroundColor */

		if(action.type === 'visualizationParameters.setBackgroundColor')
		{
			return Object.assign({}, state, {
				backgroundColor: action.backgroundColor,
			});
		}

		/* Default */

		return Object.assign({}, state, {
			colorMap: reduceColorMapState(state.colorMap, action),
			grid: reduceGridState(state.grid, action),
			legend: reduceLegendState(state.legend, action),
			filters: reduceFiltersState(state.filters, action),
		});
	}
	else
	{
		return state;
	}
}