import { Col } from 'antd';

const Column = ({ childern, ...props }) => {
	return <Col {...props}>{childern}</Col>;
};

export default Column;
