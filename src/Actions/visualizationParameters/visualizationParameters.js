export default {
	set: (field, value) => {
		return {
			type: 'visualizationParameters.set',
			field: field,
			value: value,
		};
	},
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
	setTimeSteps: (timeSteps) => {
		return {
			type: 'visualizationParameters.setTimeSteps',
			timeSteps: timeSteps,
		};
	},
	setTimeStep: (timeStep) => {
		return {
			type: 'visualizationParameters.setTimeStep',
			timeStep: timeStep,
		};
	},
};