import { Empty as Emptys } from 'antd';

const Empty = ({ children, ...props }) => {
	return <Emptys {...props}>{children}</Emptys>;
};

export default Empty;
