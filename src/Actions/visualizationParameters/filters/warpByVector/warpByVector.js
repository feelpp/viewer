export default {
	setScaleFactor: (scaleFactor) => {
		return {
			type: 'visualizationParameters.filters.warpByVector.setScaleFactor',
			scaleFactor: scaleFactor,
		};
	},
	setVectors: (vectors) => {
		return {
			type: 'visualizationParameters.filters.warpByVector.setVectors',
			vectors: vectors,
		};
	},
};