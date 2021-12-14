const DeleteFile = (e, idx, file, setFile) => {
	let temp = file.filter((word, i) => {
		return idx != i;
	});
	setFile(temp);
};

const DeleteUrl = (e, idx, file, setFile, url, setUrl) => {
	let temp = file.filter((word, i) => {
		return idx != i;
	});
	setFile(temp);
	temp = [];
	temp = url.filter((word, i) => {
		return idx != i;
	});
	setUrl(temp);
}

export {DeleteUrl}
export default DeleteFile;
