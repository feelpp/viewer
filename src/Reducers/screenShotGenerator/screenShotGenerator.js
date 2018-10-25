const screenShotGeneratorInitialState = null;

export function reduceScreenShotGeneratorState(state = screenShotGeneratorInitialState, action) {
	if(action && action.type)
	{
		/* setData */

		if(action.type === 'screenShotGenerator.set')
		{
			return action.screenShotGenerator;
		}

		/* Default */

		return state;
	}
	else
	{
		return state;
	}
}