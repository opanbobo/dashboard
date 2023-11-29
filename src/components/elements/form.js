import { Form as Forms } from 'antd';

const Form = ({ children, options }) => {
	const [forms] = Forms.useForm();
	return (
		<Forms form={forms} {...options}>
			{children}
		</Forms>
	);
};

const Item = ({ children, ...props }) => {
	return <Forms.Item {...props}>{children}</Forms.Item>;
};
Form.Item = Item;

const List = ({ children, ...props }) => {
	return <Forms.List {...props}>{children}</Forms.List>;
};
Form.List = List;

export default Form;
