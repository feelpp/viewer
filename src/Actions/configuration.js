export default {
	setConfiguration: (configuration) => {
		return {
			type: 'configuration.setConfiguration',
			configuration: configuration,
		};
	},
};