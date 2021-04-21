export const createDescription = (text: string) => {
	return text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
};
