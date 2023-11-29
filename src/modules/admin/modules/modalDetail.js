import { useEffect, useState } from 'react';

import { Modal, Button, Form, Input } from 'components';

const ModalDetail = ({ visible, infoDetail, setInfoDetail, children }) => {
	return (
		<Modal visible={visible} title={title}>
			{children}
			{/* <Form>
				<Form.Item>
					<Input
						defaultValue={infoDetail.full_name}
						onChange={(e) =>
							setInfoDetail({
								...infoDetail,
								full_name: e.target.value,
							})
						}
					/>
				</Form.Item>
			</Form> */}
		</Modal>
	);
};

export default ModalDetail;
