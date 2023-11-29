import { Popconfirm as Popconfirms } from 'antd';
import { Icon } from 'components';

const Popconfirm = ({ type, okText, cancelText, placement, children, ...props }) => {
	return (
		<Popconfirms
			placement={placement ? placement : 'left'}
			okText={
				okText ? (
					okText
				) : (
					<>
						<Icon type='DeleteOutlined' />
						Delete
					</>
				)
			}
			cancelText={cancelText ? cancelText : 'cancel'}
			okType={type ? type : 'danger'}
			{...props}
		>
			{children}
		</Popconfirms>
	);
};

export default Popconfirm;
