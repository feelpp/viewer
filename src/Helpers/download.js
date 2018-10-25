export function downloadImageURL(imageURL, fileName, MIMEType = 'image/png') {

	imageURL = imageURL.replace(MIMEType, 'image/octet-stream');

	/* Create fake link */

	const link = document.createElement('a');

	link.setAttribute('href', imageURL);
	link.setAttribute('download', fileName);

	/* Trigger download */

	link.click();
}