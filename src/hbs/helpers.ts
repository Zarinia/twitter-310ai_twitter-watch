import hbs from 'hbs';

export function printName(name) {
	const output = `<div> ${name}</div>`;
	return output;
}

export function jsonStringify(context) {
	return JSON.stringify(context);
}

export function jsonParse(context) {
	return JSON.parse(context);
}

export function escape(context) {
	return context.replace(/(['"])/g, '');
}

export function nFormatter(num, digits) {
	const lookup = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'k' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'G' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e18, symbol: 'E' }
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	var item = lookup.slice().reverse().find(function(item) {
		return num >= item.value;
	});
	return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
}

export function ifCond(v1, operator, v2, options) {
	switch (operator) {
		case '==':
			return (v1 == v2) ? options.fn(this) : options.inverse(this);
		case '===':
			return (v1 === v2) ? options.fn(this) : options.inverse(this);
		case '!=':
			return (v1 != v2) ? options.fn(this) : options.inverse(this);
		case '!==':
			return (v1 !== v2) ? options.fn(this) : options.inverse(this);
		case '<':
			return (v1 < v2) ? options.fn(this) : options.inverse(this);
		case '<=':
			return (v1 <= v2) ? options.fn(this) : options.inverse(this);
		case '>':
			return (v1 > v2) ? options.fn(this) : options.inverse(this);
		case '>=':
			return (v1 >= v2) ? options.fn(this) : options.inverse(this);
		case '&&':
			return (v1 && v2) ? options.fn(this) : options.inverse(this);
		case '||':
			return (v1 || v2) ? options.fn(this) : options.inverse(this);
		default:
			return options.inverse(this);
	}
}

export function avatarImage(image) {
	let avatar = image.split('_normal');
	return `${avatar[0]}_400x400${avatar[1]}`;
}

export function textSplit(text) {
	text = text.replace(/(['"])/g, '');
	text = text.replace(/([#])/g, '<br/>#');
	let content = text.split('https://');
	return `${content[0]}<br/><a href="https://${content[1]}" target="_blank">https://${content[1]}</a>`;
}

export function chain() {
	let helpers = [],
		args = Array.prototype.slice.call(arguments),
		argsLength = args.length,
		index,
		arg;
	
	for (index = 0, arg = args[index];
	     index < argsLength;
	     arg = args[++index]) {
		if (hbs.helpers[arg]) {
			helpers.push(hbs.helpers[arg]);
		} else {
			args = args.slice(index);
			break;
		}
	}
	
	while (helpers.length) {
		args = [helpers.pop().apply(hbs.helpers, args)];
	}
	
	return args.shift();
}
