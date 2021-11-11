

const DeleteFile = (e, name, file, setFile) => {
	let temp = file.filter((word) => {
		return word != name;
	});
	console.log(temp);
	setFile(temp);
};

const DeleteUrl = (e, name, file, setFile, setFileUrl) => {
	let temp = file.filter((word) => {
		return word != name;
	})
	console.log(temp);

}

export {DeleteUrl}
export default DeleteFile;
