export default function createMethods(session) {
	return {
		resetView: () => {
			return session.call('viewer.reset.view');
		},
		setOrientationAxesVisibility: (orientationAxesVisibility) => {
			return session.call('viewer.set.orientation.visibility', [orientationAxesVisibility]);
		},
		loadData: (data) => {
			return session.call('viewer.load.data', [data]);
		},
		setDataDisplayStatus: (dataDisplayStatus) => {
			return session.call('viewer.set.data.display.status', [dataDisplayStatus]);
		},
		setDataArray: (dataArray) => {
			return session.call('viewer.set.data.array', [dataArray]);
		},
		setRepresentationType: (representationType) => {
			return session.call('viewer.set.representation.type', [representationType]);
		},
		setColorMapPreset: (colorMapPreset) => {
			return session.call('viewer.set.color.map.preset', [colorMapPreset]);
		},
		setColorMapScale: (inferiorValue, superiorValue) => {
			return session.call('viewer.set.color.map.scale', [inferiorValue, superiorValue]);
		},
		resetColorMapScale: () => {
			return session.call('viewer.reset.color.map.scale');
		},
		setColorMapLogScaleStatus: (colorMapLogScaleStatus) => {
			return session.call('viewer.set.color.map.log.scale.status', [colorMapLogScaleStatus]);
		},
		setTimeStep: (timeStep) => {
			return session.call('viewer.set.time.step', [timeStep]);
		},
		setLegendDisplayStatus: (legendDisplayStatus) => {
			return session.call('viewer.set.legend.display.status', [legendDisplayStatus]);
		},
		setLegendTitle: (legendTitle) => {
			return session.call('viewer.set.legend.title', [legendTitle]);
		},
		setGridDisplayStatus: (gridDisplayStatus) => {
			return session.call('viewer.set.grid.display.status', [gridDisplayStatus]);
		},
		setGridTitle: (gridAxis, gridTitle) => {
			return session.call('viewer.set.grid.title', [gridAxis, gridTitle]);
		},
		setCameraPosition: (cameraPosition) => {
			return session.call('viewer.set.camera.position', [cameraPosition]);
		},
		setBackgroundColor: (backgroundColor) => {
			return session.call('viewer.set.background.color', [backgroundColor]);
		},
		disableCurrentFilter: () => {
			return session.call('viewer.filters.disable.current.filter', []);
		},
		enableWarpByVectorFilter: () => {
			return session.call('viewer.filters.enable.wrap.by.vector.filter', []);
		},
		setWarpByVectorFilterVectors: (vectors) => {
			return session.call('viewer.filters.set.wrap.by.vector.filter.vectors', [vectors]);
		},
		setWarpByVectorFilterScaleFactor: (scaleFactor) => {
			return session.call('viewer.filters.set.wrap.by.vector.filter.scale.factor', [scaleFactor]);
		},
	};
}