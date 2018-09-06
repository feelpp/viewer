/* Import */

const crypto = require('crypto');

const encryptionAlgorithm = 'aes-256-cbc';
const encryptionKey = 'fb478eee3887c6078fa48f92c2875a4cc747a8000c8ad4b357cf1f55e9f2e2ea0308409171059dc5e9a0ebccf415ae69d30efb0221ca74603e0fdc91e96fc007';

/* Exports definition */

exports.encryptData = function(data) {
	const cipher = crypto.createCipher(encryptionAlgorithm, encryptionKey);

	const JSONData = JSON.stringify(data);
	const encryptedData = cipher.update(JSONData, 'utf8', 'hex') + cipher.final('hex');

	return encryptedData;
};

exports.decryptData = function(encryptedData) {
	const decipher = crypto.createDecipher(encryptionAlgorithm, encryptionKey);

	const decryptedData = decipher.update(encryptedData, 'hex', 'utf8') + decipher.final('utf8');
	const data = JSON.parse(decryptedData);

	return data;
};