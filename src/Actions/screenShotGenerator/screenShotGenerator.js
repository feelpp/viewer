export default {
	set: (screenShotGenerator) => {
		return {
			type: 'screenShotGenerator.set',
			screenShotGenerator: screenShotGenerator,
		};
	},
};