import { Dropdown as Drop } from 'antd';

const Dropdown = ({ className, overlayHeight, overlay, children, ...props }) => {
	const overlaydiv = (
		<div
			style={{
				display: 'flex',
				position: 'relative',
				flexDirection: 'column',
				height: overlayHeight == null ? 160 : overlayHeight,
				padding: 8,
				justifyContent: 'space-between',
			}}
		>
			{overlay}
		</div>
	);
	return (
		<Drop className={className} overlay={overlaydiv} overlayStyle={overStyle} {...props}>
			{children}
		</Drop>
	);
};

const overStyle = {
	background: '#fff',
	boxShadow: '3px 0px 20px -12px rgba(54, 65, 76, 0.5)',
	borderRadius: 3,
};

export default Dropdown;
