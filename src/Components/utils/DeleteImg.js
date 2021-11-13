

const DeleteFile = (e, idx, file, setFile) => {
	let temp = file.filter((word, i) => {
		return i != idx;
	});
	console.log(temp);
	setFile(temp);
};

const DeleteUrl = (e, idx, urls, setUrls, file, setFile) => {
	let temp = urls.filter((word, i) => {
		return i != idx;
	});
	setUrls(temp);
	temp = [];
	temp = file.filter((word, i) => {
		return i != idx;
	});
	setFile(temp);
}

export {DeleteUrl}
export default DeleteFile;
