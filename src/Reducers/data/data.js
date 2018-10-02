const dataInitialState = null;

export function reduceDataState(state = dataInitialState, action) {
	if(action && action.type)
	{
		/* setData */

		if(action.type === 'data.setData')
		{
			return action.data;
		}

		/* Default */

		return state;
	}
	else
	{
		return state;
	}
}