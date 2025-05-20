export function classNames() {
	let classes = '';

	for (let i = 0; i < arguments.length; i++) {
		const className = arguments[i];
		if (typeof className !== 'string') {
			continue;
		}
		classes += className;
		if (i !== arguments.length - 1) {
			classes += ' ';
		}
	}
	return classes;
}
