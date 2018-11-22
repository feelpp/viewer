export default {
	set: (field, value) => {
		return {
			type: 'visualizationParameters.set',
			field: field,
			value: value,
		};
	},
	setDataArrays: (dataArrays) => {
		return {
			type: 'visualizationParameters.setDataArrays',
			dataArrays: dataArrays,
		};
	},
	setDataDisplayStatus: (dataDisplayStatus) => {
		return {
			type: 'visualizationParameters.setDataDisplayStatus',
			dataDisplayStatus: dataDisplayStatus,
		};
	},
	setEditorDisplayStatus: (editorDisplayStatus) => {
		return {
			type: 'visualizationParameters.setEditorDisplayStatus',
			editorDisplayStatus: editorDisplayStatus,
		};
	},
	setDataArray: (dataArray) => {
		return {
			type: 'visualizationParameters.setDataArray',
			dataArray: dataArray,
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
	setBackgroundColor: (backgroundColor) => {
		return {
			type: 'visualizationParameters.setBackgroundColor',
			backgroundColor: backgroundColor,
		};
	},
};