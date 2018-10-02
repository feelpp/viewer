export default {
	setOpenStatus: (openStatus) => {
		return {
			type: 'panel.setOpenStatus',
			openStatus: openStatus,
		};
	},
};