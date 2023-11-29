import { DatePicker as Pickers } from 'antd';

const DatePicker = ({ ...props }) => {
	return <Pickers style={{ width: '100%' }} {...props} />;
};

export default DatePicker;
