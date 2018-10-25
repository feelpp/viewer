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
	setColorMapPresets: (colorMapPresets) => {
		return {
			type: 'visualizationParameters.setColorMapPresets',
			colorMapPresets: colorMapPresets,
		};
	},
	setColorMapPreset: (dataArray, colorMapPreset) => {
		return {
			type: 'visualizationParameters.setColorMapPreset',
			dataArray: dataArray,
			colorMapPreset: colorMapPreset,
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
	setScaleBarVisibility: (scaleBarVisibility) => {
		return {
			type: 'visualizationParameters.setScaleBarVisibility',
			scaleBarVisibility: scaleBarVisibility,
		};
	},
	setBackgroundColor: (backgroundColor) => {
		return {
			type: 'visualizationParameters.setBackgroundColor',
			backgroundColor: backgroundColor,
		};
	},
};