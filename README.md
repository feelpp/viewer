Cemosis Viewer
==============

[Kitware](https://www.kitware.com/) has developed for Cemosis a web viewer allowing Cemosis users to visualize Feel++ data type using remote rendering.

The application has been built on top of [React](https://reactjs.org/) and [ParaViewWeb](https://kitware.github.io/paraviewweb/) open-source libraries.

Instantiation
=============

Compiled version instantiation
------------------------------

Kitware used [WebPack](https://webpack.js.org/) in order to build a compiled version of the Cemosis viewer.
This version lives in the `./dist` directory.

To use to compiled version, you need to:

 - Load the JavaScript file:

```
<script src="./Viewer.js"></script>
```

- Instantiate the application into a dedicated container:

```
<body>
    <div id="root"></div>
    
    <script>
        var containerId = 'root';
        
        var data = '...';
        
        var configuration = {
            ...
        };
        
        var viewer = new Cemosis.Viewer(containerId, data, configuration);
    </script>
</body>
```

You need to set manually the size of the container as the application has been conceived to use the whole space available:

```
#root
{
    position: absolute;
    width: 100%;
    height: 100%;
}
```

Source version instantiation
----------------------------

In case your main application is using React (as a frontend library) and WebPack (for the building process), you can consider to use the Viewer sources instead of the compiled version.

You need to use the `Root` component defined in `./src/Components/Root/Root.js`:

```
const data = '...';

const configuration = {
    ...
};

<Root
    data={data}
    configuration={configuration}
/>
```

Parameters
----------

To correctly use the viewer, using the source or the compiled version, you need to properly configure it.

You need to pass to the viewer two parameters:

- `data`: 

	This parameters is a string describing the data to load. Since this parameter is passed by the client to the server, it need to be not obvious / encrypted.
	
	In the context of this standalone project, a signature mechanism example has been implemented.
	A signature is generated, passed as `data` parameter to the viewer, passed to the server by the viewer, decrypted and handled by the server.
	In order to decrypt the signature, the server need to access a decoder handling it. This decoder is passed to the server starting script using the `--data-load-signature-decoder` option.
	Examples of [signature encoder]('./bin/encodeDataLoadSignature.js') and [signature decoder]('./bin/decodeDataLoadSignature.js') live in `./bin`.
	
	In a production environment you can use a token mechanism instead.
	A token is generated, passed as `data` parameter to the viewer, passed to the server by the viewer, checked and handled by the server.
	
	In both case, the `data-load-signature-decoder` executable need to return a JSON response of the following format:
	
	```
	{
	    value: ..., // boolean describing if decoding succeed
	    code: ..., // number describing decoding result
	    data: {
	        filePath: ..., // string describing the relative path of the file to load, belonging to the data directory
	        expirationDate: ..., // string describing when the data load signature expires
	    },
	}
	```

- `configuration`:

	This parameter is a JavaScript object describing the configuration of the viewer:
	
	```
	{
	    connection: {
	        sessionManagerURL: ..., // string describing URL to get WebSocket connection to use for the viewer
	        timeout: ..., // number describing the accepted time during the API need to respond
	    },
	    render: {
	        quality: {
	            still: ..., // number [0:100] describing the JPEG compression percentage image to use for still images
	            interactive: ..., // number [0:100] describing the JPEG compression percentage to use for interactive images
	        },
	        ratio: {
	            still: ..., // number [0:1] describing the size ratio of the JPEG image to use for still images
	            interactive: ..., // number [0:1] describing the size ratio of the JPEG image to use for interactive images
	        },
	    },
	    statisticsDisplayStatus: ..., // boolean describing if statistics should be displayed
	}
	```

Setup
=====

Production
----------

TODO

Development
-----------

In order to develop on the project and test new features, you need two things:

1. Start server:

	To start the server you need to run the following command:

	```
	node ./bin/startRenderingServer.js --pvpython [PVPYTHON_EXECUTABLE_PATH] --data-directory-path [DATA_DIRECTORY_PATH] --data-load-signature-decoder [DATA_LOAD_SIGNATURE_DECODER_EXECUTABLE_PATH]
	```

	The following parameters need to be passed:
	- `PVPYTHON_EXECUTABLE_PATH`: Path to `pvpython` executable, 5.5 version is required
	- `DATA_DIRECTORY_PATH`: Path to the directory used to store the data available to be loaded by the viewer: (`.../data`)
	- `DATA_LOAD_SIGNATURE_DECODER_EXECUTABLE_PATH`: Path to `decodeDataLoadSignature` executable: (`.../bin/decodeDataLoadSignature.js`)
	
2. Open the testing web page:

	Open the page [`http://localhost:8080/`](http://localhost:8080/) with your browser