const initialState = {
	loadStatus: false,
	client: null,
};

export default function connection(state = initialState, action) {
	if(action && action.type)
	{
		/* setLoadStatus */

		if(action.type === 'connection.setLoadStatus')
		{
			return Object.assign({}, state, {
				loadStatus: action.loadStatus,
			});
		}

		/* setClient */

		if(action.type === 'connection.setClient')
		{
			return Object.assign({}, state, {
				client: action.client,
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