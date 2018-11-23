export default {
	setData: (data) => {
		return {
			type: 'visualizationParameters.filters.contour.setData',
			data: data,
		};
	},
	setValues: (values) => {
		return {
			type: 'visualizationParameters.filters.contour.setValues',
			values: values,
		};
	},
};