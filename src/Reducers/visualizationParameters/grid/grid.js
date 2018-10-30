export const gridInitialState = {
	displayStatus: null,
	titles: {
		X: '',
		Y: '',
		Z: '',
	},
};

export function reduceGridState(state = gridInitialState, action) {
	if(action && action.type)
	{
		/* setDisplayStatus */

		if(action.type === 'visualizationParameters.grid.setDisplayStatus')
		{
			return Object.assign({}, state, {
				displayStatus: action.displayStatus,
			});
		}

		/* setTitles */

		if(action.type === 'visualizationParameters.grid.setTitles')
		{
			return Object.assign({}, state, {
				titles: action.titles,
			});
		}

		/* setTitle */

		if(action.type === 'visualizationParameters.grid.setTitle')
		{
			return Object.assign({}, state, {
				titles: Object.assign({}, state.titles, {
					[action.axis]: action.title,
				}),
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