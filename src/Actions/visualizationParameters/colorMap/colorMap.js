export default {
	setPresets: (presets) => {
		return {
			type: 'visualizationParameters.colorMap.setPresets',
			presets: presets,
		};
	},
	setPreset: (dataArray, preset) => {
		return {
			type: 'visualizationParameters.colorMap.setPreset',
			dataArray: dataArray,
			preset: preset,
		};
	},
};