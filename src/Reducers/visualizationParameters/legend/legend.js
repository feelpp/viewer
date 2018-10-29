import DeepEqual from 'deep-equal';

export const legendInitialState = {
	displayStatus: null,
	titles: [],
};

export function reduceLegendState(state = legendInitialState, action) {
	if(action && action.type)
	{
		/* setTitles */

		if(action.type === 'visualizationParameters.legend.setTitles')
		{
			return Object.assign({}, state, {
				titles: action.titles,
			});
		}

		/* setTitle */

		if(action.type === 'visualizationParameters.legend.setTitle')
		{
			return Object.assign({}, state, {
				titles: state.titles.map((title) => {
					return {
						dataArray: title.dataArray,
						title: (DeepEqual(title.dataArray, action.dataArray)) ? action.title : title.title,
					};
				}),
			});
		}

		/* setDisplayStatus */

		if(action.type === 'visualizationParameters.legend.setDisplayStatus')
		{
			return Object.assign({}, state, {
				displayStatus: action.displayStatus,
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