export const createId = () => {
	let S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let N = 16;
	const id = Array.from(Array(N))
		.map(() => S[Math.floor(Math.random() * S.length)])
		.join("");
	return id;
};
