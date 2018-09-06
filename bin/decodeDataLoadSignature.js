#! /usr/bin/env node

/* Import */

const program = require('commander');
const moment = require('moment');

const encryption = require('./encryption.js');

/* Functions definition */

/* Get parameters */

program
	.option('--data-load-signature [b1d9cff582...]', 'Load order\n')
	.parse(process.argv);

/* Decode */

let response = null;

const decryptedData = encryption.decryptData(program.dataLoadSignature);

if(decryptedData)
{
	const currentDate = moment();
	const expirationDate = moment(decryptedData.expirationDate);

	if(currentDate.isBefore(expirationDate))
	{
		response = {
			status: true,
			code: 1,
			data: {
				filePath: decryptedData.filePath,
				expirationDate: decryptedData.expirationDate,
			},
		};
	}
	else
	{
		response = {
			status: false,
			code: -2,
			data: {
				filePath: decryptedData.filePath,
				expirationDate: decryptedData.expirationDate,
			},
		};
	}
}
else
{
	response = {
		status: false,
		code: -1,
		data: null,
	};
}

/* Return */

console.log(JSON.stringify(response));