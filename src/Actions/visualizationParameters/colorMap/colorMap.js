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
	setTitles: (titles) => {
		return {
			type: 'visualizationParameters.colorMap.setTitles',
			titles: titles,
		};
	},
	setTitle: (dataArray, title) => {
		return {
			type: 'visualizationParameters.colorMap.setTitle',
			dataArray: dataArray,
			title: title,
		};
	},
	setLogScaleStatus: (logScaleStatus) => {
		return {
			type: 'visualizationParameters.colorMap.setLogScaleStatus',
			logScaleStatus: logScaleStatus,
		};
	},
};