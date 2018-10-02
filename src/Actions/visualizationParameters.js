export default {
	setRepresentationTypes: (representationTypes) => {
		return {
			type: 'visualizationParameters.setRepresentationTypes',
			representationTypes: representationTypes,
		};
	},
	setRepresentationType: (representationType) => {
		return {
			type: 'visualizationParameters.setRepresentationType',
			representationType: representationType,
		};
	},
};