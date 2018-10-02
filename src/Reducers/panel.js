const initialState = {
	openStatus: false,
};

export default function panel(state = initialState, action) {
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
};