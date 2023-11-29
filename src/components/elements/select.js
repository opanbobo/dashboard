import { Select as Selects } from 'antd';
import { Icon } from 'components';

function Select({ showArrow, mode, suffixIcon, prefixIcon, children, ...props }) {
	return (
		<Selects
			showArrow={showArrow}
			mode={mode}
			suffixIcon={suffixIcon != null ? <Icon type={suffixIcon} /> : <Icon type='DownOutlined' />}
			{...props}
		>
			{children}
		</Selects>
	);
}

const Option = ({ children, ...props }) => {
	return <Selects.Option {...props}>{children}</Selects.Option>;
};

// const Group = ({ children, ...props }) => {
// 	return <OptGroups {...props}>{children}</OptGroups>;
// };

Select.Option = Option;
// Select.Group = Group;

export default Select;
