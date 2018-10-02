const panelInitialState = {
	openStatus: false,
};

export function reducePanelState(state = panelInitialState, action) {
	if(action && action.type)
	{
		/* setOpenStatus */

		if(action.type === 'panel.setOpenStatus')
		{
			return Object.assign({}, state, {
				openStatus: action.openStatus,
			});
		}

		/* Default */

		return state;
	}
	else
	{
		return state;
	}
}