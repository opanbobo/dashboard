import { Drawer, Button, Modal } from 'components';

const PopupComponent = ({ title, isOpen, onClose, submit, submitDisable, children }) => {
	return (
		<Drawer
			title={title}
			visible={isOpen}
			onClose={onClose}
			footer={
				<Button type='primary' style={{ float: 'right' }} disabled={submitDisable} onClick={submit}>
					Submit Update
				</Button>
			}
		>
			{children}
		</Drawer>
	);
};

const ModalCreate = ({ isOpen, onClose, submit, children }) => {
	return (
		<Modal
			closable
			title='Create New'
			visible={isOpen}
			onCancel={onClose}
			footer={[
				<Button key='submit' type='primary' onClick={submit}>
					Submit
				</Button>,
			]}
		>
			{children}
		</Modal>
	);
};

PopupComponent.Create = ModalCreate;

export default PopupComponent;
