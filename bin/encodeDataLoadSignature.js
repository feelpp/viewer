#! /usr/bin/env node

/* Import */

const program = require('commander');
const moment = require('moment');

const encryption = require('./encryption.js');

/* Functions definition */

/* Get parameters */

program
	.option('--file-path [filePath]', 'Path to file\n')
	.option('--hours-of-validity [1]', 'Hours of validity', 1)
	.parse(process.argv);

/* Encode */

let response = null;

const filePath = program.filePath;
const expirationDate = moment().add(program.hoursOfValidity, 'hours').format('YYYY-MM-DD HH:mm:ss');

const data = {
	filePath: filePath,
	expirationDate: expirationDate,
};

const encryptedData = encryption.encryptData(data);

if(encryptedData)
{
	response = {
		value: true,
		code: 1,
		data: {
			filePath: program.filePath,
			expirationDate: expirationDate,
			dataLoadSignature: encryptedData,
		},
	};
}
else
{
	response = {
		value: false,
		code: -1,
		data: {
			filePath: program.filePath,
			expirationDate: expirationDate,
			dataLoadSignature: null,
		},
	};
}

/* Return */

console.log(JSON.stringify(response));