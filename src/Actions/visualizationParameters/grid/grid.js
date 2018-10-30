export default {
	setDisplayStatus: (displayStatus) => {
		return {
			type: 'visualizationParameters.grid.setDisplayStatus',
			displayStatus: displayStatus,
		};
	},
	setTitles: (titles) => {
		return {
			type: 'visualizationParameters.grid.setTitles',
			titles: titles,
		};
	},
	setTitle: (axis, title) => {
		return {
			type: 'visualizationParameters.grid.setTitle',
			axis: axis,
			title: title,
		};
	},
};