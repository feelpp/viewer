import {createClient} from 'paraviewweb/src/IO/WebSocket/ParaViewWebClient';
import SmartConnect from 'wslink/src/SmartConnect';

export class Connection {
	constructor(sessionManagerURL, protocols, callbacks) {
		this.smartConnect = null;
		this.connection = null;
		this.client = null;

		/* SmartConnect */

		this.smartConnect = SmartConnect.newInstance({
			config: {
				sessionManagerURL: sessionManagerURL,
				application: 'viewer',
			},
		});

		/* Callbacks */

		this.smartConnect.onConnectionReady((connection) => {

			/* Store connection */

			this.connection = connection;

			/* Create client */

			this.client = createClient(connection, protocols.native, protocols.custom);

			/* Callback */

			if(callbacks.ready)
			{
				callbacks.ready(this.client);
			}
		});

		this.smartConnect.onConnectionError(() => {
			if(callbacks.error)
			{
				callbacks.error();
			}
		});

		this.smartConnect.onConnectionClose(() => {
			if(callbacks.close)
			{
				callbacks.close();
			}
		});
	}

	connect() {
		this.smartConnect.connect();
	}

	disconnect(timeout = 60) {
		if(this.connection)
		{
			this.connection.destroy(timeout);
		}
	}
}