import DeepEqual from 'deep-equal';

export const colorMapInitialState = {
	presets: [],
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

		/* Default */

		return state;
	}
	else
	{
		return state;
	}
}