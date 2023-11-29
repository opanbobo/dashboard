import { Tooltip as Tooltips } from 'antd';

const Tooltip = ({ className, children, ...props }) => {
	return (
		<Tooltips
			overlayClassName={className}
			color='#fff'
			overlayInnerStyle={{
				color: '#36414c',
				textTransform: 'capitalize',
			}}
			{...props}
		>
			{children}
		</Tooltips>
	);
};

export default Tooltip;
