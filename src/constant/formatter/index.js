function formatNumber(num) {
	return num ? num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : '-';
}
export function stringPrice(price = 0) {
	return `${formatNumber(price)}`;
}

export function prettyPrice(price) {
	const formatter = new Intl.NumberFormat(['ban', 'id'], {
		style: 'currency',
		currency: 'IDR',
	});
	return formatter.format(price);
}

export const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const uppercase = (str) => {
	return str.toUpperCase();
};
