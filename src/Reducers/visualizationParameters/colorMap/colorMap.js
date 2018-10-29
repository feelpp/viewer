import DeepEqual from 'deep-equal';

export const colorMapInitialState = {
	presets: [],
	names: [],
	logScaleStatus: null,
};

export function reduceColorMapState(state = colorMapInitialState, action) {
	if(action && action.type)
	{
		/* setPresets */

		if(action.type === 'visualizationParameters.colorMap.setPresets')
		{
			return Object.assign({}, state, {
				presets: action.presets,
			});
		}

		/* setPreset */

		if(action.type === 'visualizationParameters.colorMap.setPreset')
		{
			return Object.assign({}, state, {
				presets: state.presets.map((preset) => {
					return {
						dataArray: preset.dataArray,
						preset: (DeepEqual(preset.dataArray, action.dataArray)) ? action.preset : preset.preset,
					};
				}),
			});
		}
		
		/* setTitles */

		if(action.type === 'visualizationParameters.colorMap.setTitles')
		{
			return Object.assign({}, state, {
				titles: action.titles,
			});
		}

		/* setTitle */

		if(action.type === 'visualizationParameters.colorMap.setTitle')
		{
			return Object.assign({}, state, {
				titles: state.titles.map((title) => {
					return {
						dataArray: title.dataArray,
						title: (DeepEqual(title.dataArray, action.dataArray)) ? action.title : title.title,
					};
				}),
			});
		}

		/* setLogScaleStatus */

		if(action.type === 'visualizationParameters.colorMap.setLogScaleStatus')
		{
			return Object.assign({}, state, {
				logScaleStatus: action.logScaleStatus,
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