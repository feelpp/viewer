import React from 'react';
import {render} from 'react-dom';

import {getDefaultSessionManagerURL} from './Helpers/sessionManager.js';

import Root from './Components/Root/Root.js';

export class Viewer {

	constructor(containerId, data, configuration = {}) {

		/* Configuration */

		const defaultConfiguration = {
			connection: {
				sessionManagerURL: getDefaultSessionManagerURL(),
				timeout: 60,
			},
			render: {
				quality: {
					still: 100,
					interactive: 25,
				},
				ratio: {
					still: 1,
					interactive: 0.5,
				},
			},
			statisticsDisplayStatus: false,
			visualizationParameterEditor: {
				displayStatus: true,
				initialOpenStatus: false,
				sectionInitialOpenStatus: {
					view: true,
					colorMap: false,
					camera: false,
					legend: false,
					grid: false,
					filters: false,
					others: false,
				},
			},
			screenShot: {
				format: 'png',
				quality: 1,
			},
		};

		configuration = Object.assign({}, defaultConfiguration, configuration);

		/* Create element */

		const element = (
			<Root
				data={data}
				configuration={configuration}
			/>
		);

		/* Render element */

		render(element, document.getElementById(containerId));
	}
}