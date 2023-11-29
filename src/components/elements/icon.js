import * as icons from 'assets/icondata';

function Icon({ type, className, size, color, twoToneColor, ...props }) {
	const Component = icons[type];
	return (
		<Component
			style={{ fontSize: `${size}px`, color: color }}
			className={`${className}`}
			twoToneColor={`#${twoToneColor}`}
			{...props}
		/>
	);
}

export default Icon;
