export const randomColor: any = () => {
	const color = Math.floor(Math.random() * 16777215).toString(16);
	if (color.length < 6) {
		return randomColor();
	}
	return color;
};
