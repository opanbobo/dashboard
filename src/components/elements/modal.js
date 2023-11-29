import { Modal as Modals } from 'antd';
import { Icon } from 'components';

const Modal = ({ className, children, closable = false, ...props }) => {
	return (
		<Modals
			style={{ top: 20 }}
			wrapClassName={className}
			closable={closable}
			closeIcon={closable == true ? <Icon type='CloseSquareTwoTone' twoToneColor='ff6b6b' /> : null}
			{...props}
		>
			{children}
		</Modals>
	);
};

export default Modal;
