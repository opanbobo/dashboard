import { Tag as Tags } from 'antd';
import { Icon } from 'components';

const Tag = ({ children, icon, ...props }) => {
	return (
		<Tags icon={icon != null && <Icon type={icon} {...props} />} {...props}>
			<span style={textEllipis}>{children}</span>
		</Tags>
	);
};

const textEllipis = {
	display: '-webkit-inline-flex',
	maxWidth: '100%',
	WebkitLineClamp: 1,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	userSelect: 'none',
};

export default Tag;
