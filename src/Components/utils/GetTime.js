

function GetTime(before) {
	let time = ((Date.now() - Date.parse(before)) / 1000) / 60 - 540; // 분단위
	time = Math.floor(time); // Date.now와 updatedAt 차이가 18시간정도 남.
	if (time < 1)
		return "방금 전";
	else if (time < 60)
		return `${Math.floor(time)}분 전`;
	else if (time < 1440)
		return `${Math.floor(time / 60)}시간 전`;
	else if (time < 43200)
		return `${Math.floor(time / 60 / 24)}일 전`;
	else if (time < 525600)
		return `${Math.floor(time / 60 / 24 / 30)}개월 전`;
	else
		return `${Math.floor(time / 60 / 24 / 30 / 12)}년 전`;
}

export default GetTime;
