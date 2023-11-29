import { Radio as Radios } from 'antd';

const Radio = ({ type, children, ...props }) => {
	switch (type) {
		case 'group':
			return <Radios.Group {...props}>{children}</Radios.Group>;
		default:
			return <Radios {...props}>{children}</Radios>;
	}
};

export default Radio;
