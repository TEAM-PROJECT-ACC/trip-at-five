export const validateEmail = (id) => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id);
};
