export default {
	setTitles: (titles) => {
		return {
			type: 'visualizationParameters.legend.setTitles',
			titles: titles,
		};
	},
	setTitle: (dataArray, title) => {
		return {
			type: 'visualizationParameters.legend.setTitle',
			dataArray: dataArray,
			title: title,
		};
	},
	setDisplayStatus: (displayStatus) => {
		return {
			type: 'visualizationParameters.legend.setDisplayStatus',
			displayStatus: displayStatus,
		};
	},
};