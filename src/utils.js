export function splitPer(arr, len = 1) {
	let result = []
	for (let i = 0; i < arr.length; i += len) {
		result.push(arr.slice(i, i + len))
	}
	return result
}
export function random(min, max) {
	return parseInt(Math.random() * (max - min) + min)
}
