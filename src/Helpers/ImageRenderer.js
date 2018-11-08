import DeepEqual from 'deep-equal';
import MouseHandler from 'paraviewweb/src/Interaction/Core/MouseHandler';

export class ImageRenderer {
	constructor(container, imageProvider, mouseListener, statisticsCallback = null) {

		this.container = container;
		this.imageProvider = imageProvider;
		this.mouseListener = mouseListener;
		this.statisticsCallback = statisticsCallback;

		this.canvas = null;
		this.context = null;
		this.image = null;
		this.mouseHandler = null;
		this.subscription = null;

		this.size = {
			width: 400,
			height: 300,
		};

		/* Canvas */

		this.canvas = document.createElement('canvas');

		this.container.appendChild(this.canvas);

		/* Context */

		this.context = this.canvas.getContext('2d');

		/* MouseHandler */

		this.mouseHandler = new MouseHandler(this.canvas);
		this.mouseHandler.attach(this.mouseListener);

		/* Image */

		this.image = new Image();
		this.image.onload = () => {
			this.updateCanvas();
		};

		/* Subscription */

		this.subscription = this.imageProvider.onImageReady((data) => {
			this.updateData(data);
		});
	}

	updateData(data) {
		this.image.src = data.url;

		if(this.statisticsCallback)
		{
			this.statisticsCallback({
				frameRate: data.fps,
				imageSize: data.metadata.memory,
				workTime: data.metadata.workTime,
			});
		}
	}

	updateSize(size) {
		if(! DeepEqual(this.size, size))
		{
			this.size = size;

			this.updateCanvas();
		}
	}

	updateCanvas() {
		if(this.image.src)
		{
			/* Canvas */

			this.canvas.setAttribute('width', this.size.width);
			this.canvas.setAttribute('height', this.size.height);

			/* Context */

			this.context.drawImage(
				this.image,
				0,
				0,
				this.size.width,
				this.size.height
			);
		}
	}

	getCanvas() {
		return this.canvas;
	}

	destroy() {

		/* Subscription */

		if(this.subscription)
		{
			this.subscription.unsubscribe();
		}

		/* MouseHandler */

		if(this.mouseHandler)
		{
			this.mouseHandler.destroy();
		}
	}
}