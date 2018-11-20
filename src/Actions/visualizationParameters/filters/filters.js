export default {
	setFilter: (filter) => {
		return {
			type: 'visualizationParameters.filters.setFilter',
			filter: filter,
		};
	},
	setPreset: (filter, parameters) => {
		return {
			type: 'visualizationParameters.filters.setParameters',
			filter: filter,
			parameters: parameters,
		};
	},
};