export default {
	setFilter: (filter) => {
		return {
			type: 'visualizationParameters.filters.setFilter',
			filter: filter,
		};
	},
};