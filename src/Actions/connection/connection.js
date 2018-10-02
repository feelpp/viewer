export default {
	setLoadStatus: (loadStatus) => {
		return {
			type: 'connection.setLoadStatus',
			loadStatus: loadStatus,
		};
	},
	setClient: (client) => {
		return {
			type: 'connection.setClient',
			client: client,
		};
	},
};