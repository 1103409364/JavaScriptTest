export const add = () => {
	return { "type": "ADD" }
};

export const minus = () => {
	return { "type": "MINUS" }
};

export const addNum = (num) => {
	return { "type": "ADDNUM", "num": num }
};