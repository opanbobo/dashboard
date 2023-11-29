import { Checkbox as Checkboxs } from 'antd';

const Checkbox = ({ type, children, ...props }) => {
	switch (type) {
		case 'group':
			return <Checkboxs.Group {...props} />;
		default:
			return <Checkboxs {...props}>{children}</Checkboxs>;
	}
};

export default Checkbox;
