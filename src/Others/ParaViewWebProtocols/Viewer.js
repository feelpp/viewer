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
		setColorMap: (colorMap) => {
			return session.call('viewer.set.color.map', [colorMap]);
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