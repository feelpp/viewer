#! /usr/bin/env node

/* Import */

const open = require('open');
const shell = require('shelljs');
const path = require('path');
const program = require('commander');

/* Functions definition */

function generateQuotedString(str) {
	return '"' + str + '"';
}

/* Get parameters */

program
	.option('--pvpython [path]', 'PVPython executable path\n')
	.option('--port [8080]', 'Start web server with given port', 8080)
	.option('--data-directory-path [directory]', 'Data directory to serve')
	.option('--data-load-signature-decoder [path]', 'DataLoadSignatureDecoder executable path\n')
	.option('--open-window', 'Open the web browser to the correct page\n')

	.parse(process.argv);

/* Generate command line */

const commandLineParts = [
	generateQuotedString(program.pvpython),
	'--force-offscreen-rendering',
	'-dr',
	generateQuotedString(path.normalize(path.join(__dirname, '../server/startRenderingServer.py'))),
	'--content', generateQuotedString(path.normalize(path.join(__dirname, '../dist'))),
	'--port', program.port,
	'--data-directory-path', generateQuotedString(program.dataDirectoryPath),
	'--data-load-signature-decoder', generateQuotedString(program.dataLoadSignatureDecoder),
];

const commandLine = commandLineParts.join(' ');

/* Run server */

console.log('\n===============================================================================');
console.log('| Execute:');
console.log('| $', commandLineParts.join('\n|\t'));
console.log('===============================================================================\n');

shell
	.exec(commandLine, {
		async: true,
	})
	.stdout
	.on('data', (data) => {
			if(data.indexOf('Starting factory') !== -1)
			{
				if(program.openWindow)
				{
					open('http://localhost:' + program.port);
				}
			}
		}
	);
