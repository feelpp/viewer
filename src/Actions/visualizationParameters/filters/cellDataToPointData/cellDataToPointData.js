export default {
	setData: (data) => {
		return {
			type: 'visualizationParameters.filters.cellDataToPointData.setData',
			data: data,
		};
	},
	setValues: (values) => {
		return {
			type: 'visualizationParameters.filters.cellDataToPointData.setValues',
			values: values,
		};
	},
};
