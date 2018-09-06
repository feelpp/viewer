const initialState = null;

export default function data(state = initialState, action) {
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
};