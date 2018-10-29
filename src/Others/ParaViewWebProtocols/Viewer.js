export default function createMethods(session) {
	return {
		resetView: () => {
			return session.call('viewer.reset.view');
		},
		setOrientationAxesVisibility: (orientationAxesVisibility) => {
			return session.call('viewer.set.orientation.visibility', [orientationAxesVisibility]);
		},
		loadFile: (fileName) => {
			return session.call('viewer.load.file', [fileName]);
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
		setColorMapTitle: (colorMapTitle) => {
			return session.call('viewer.set.color.map.title', [colorMapTitle]);
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
		setScaleBarVisibility: (scaleBarVisibility) => {
			return session.call('viewer.set.scale.bar.visibility', [scaleBarVisibility]);
		},
		setCameraPosition: (cameraPosition) => {
			return session.call('viewer.set.camera.position', [cameraPosition]);
		},
		setBackgroundColor: (backgroundColor) => {
			return session.call('viewer.set.background.color', [backgroundColor]);
		},
	};
}