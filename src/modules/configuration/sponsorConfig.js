import { useDispatch, useSelector, Fragment } from 'react-redux';
import { useState, useEffect } from 'react';

import { Table, ColumnList, Row, Col, Form, notification, Input, Button, Modal, Popconfirm } from 'components';
import { addSponsor, deleteSponsor, getSponsor, updateSponsor } from 'store/actions/newsClippingActions';
import { capitalize } from 'constant/formatter';

const SponsorConfig = () => {
	const dispatch = useDispatch();
	const newsClipping = useSelector((state) => state.newsClipping);

	const { sponsorList } = newsClipping;

	const [sponsorSelection, setSponsorSelection] = useState('checkbox');
	const [selectedSponsor, setSelectedSponsor] = useState([]);

	const [sponsorModalCreate, setSponsorModalCreate] = useState(false);
	const [sponsorForm, setsponsorForm] = useState({});

	const [sponsorModalEdit, setSponsorModalEdit] = useState(false);
	const [sponsorFormEdit, setsponsorFormEdit] = useState({});

	useEffect(() => {
		dispatch(getSponsor());
	}, []);

	const handleOpenEdit = (id, value) => {
		setSponsorModalEdit(true);
		setsponsorFormEdit({
			id: value.id,
			name: value.name,
			new_sponsor_name: value.new_sponsor_name,
		});

		console.log(value);
	};

	const handleCreateSponsor = () => {
		addSponsor({
			sponsor_name: sponsorForm.sponsor_name,
		})
			.then((data) => data.json())
			.then((data) => {
				notification.info({ message: capitalize(data.message) });

				setSponsorModalCreate(false);
				setsponsorForm({});
				dispatch(getSponsor());
			})
			.catch((err) => {
				err;
			});
	};

	const handleEditSponsor = () => {
		updateSponsor({
			...sponsorFormEdit,
			new_sponsor_name: sponsorFormEdit.new_sponsor_name,
		})
			.then((data) => data.json())
			.then((data) => {
				notification.info({ message: capitalize(data.message) });

				setSponsorModalEdit(false);
				setsponsorFormEdit({});
				dispatch(getSponsor());
			})
			.catch((err) => {
				err;
			});
	};

	const handleDeleteSponsor = (ids) => {
		deleteSponsor({ id: ids })
			.then((data) => data.json())
			.then((data) => {
				notification.success({ message: capitalize(data.message) });
				dispatch(getSponsor());
			})
			.catch((err) => {
				err;
			});
	};

	return (
		<Row style={{ height: '100%' }}>
			<Col span={8}>
				<Button icons='PlusCircleOutlined' type='dashed' onClick={() => setSponsorModalCreate(true)}>
					Sponshorship
				</Button>
			</Col>
			<Col span={24}>
				<Table
					data={sponsorList.result.data}
					pagination={{
						total: sponsorList.result.data ? sponsorList.result.data.length : 0,
						showTotal: (total) => `Total ${total} items`,
					}}
					rowKey={(record) => {
						return record.id;
					}}
					column={[
						{
							title: 'Spokeperson Alias List',
							render: (record) => (
								<Fragment>
									<ColumnList title='name' content={record.name} />
									<ColumnList title='action' type='action'>
										<Button size='small' icons='EditTwotone' />
										<Popconfirm
											title='Are you sure to delete this?'
											onConfirm={() => handleDeleteSponsor(record.id)}
											onCancel={() => {
												console.log('cancel delete');
											}}
										>
											<Button size='small' icons='DeleteOutlined' type='dashed' danger='true' />
										</Popconfirm>
									</ColumnList>
								</Fragment>
							),
							responsive: ['xs'],
						},
						{
							title: 'Name',
							dataIndex: 'name',
							key: 'name',
							responsive: ['md'],
						},
						{
							title: 'Action',
							key: 'action',
							width: 100,
							align: 'center',
							responsive: ['md'],
							render: (text, record) => (
								<ColumnList type='action'>
									<Button size='small' icons='EditOutlined' onClick={() => handleOpenEdit(record.id, record)} />
									<Popconfirm
										title='Are you sure to delete this?'
										onConfirm={() => handleDeleteSponsor(record.id)}
										onCancel={() => {
											console.log('cancel delete');
										}}
									>
										<Button size='small' icons='DeleteOutlined' type='dashed' danger='true' />
									</Popconfirm>
								</ColumnList>
							),
						},
					]}
				/>
			</Col>
			{sponsorModalCreate && (
				<Modal
					visible={sponsorModalCreate}
					title='Create Sponsorship'
					footer={[
						<Button key='cancel' type='dashed' danger onClick={() => setSponsorModalCreate(false)}>
							Cancel
						</Button>,
						<Button key='submit' type='primary' onClick={() => handleCreateSponsor()}>
							Submit
						</Button>,
					]}
				>
					<Form>
						<Form.Item label='Sponsor Name' name='sponsor_name' labelCol={{ span: 24 }}>
							<Input
								placeholder='sponsor name'
								name='sponsor_name'
								value={sponsorForm.sponsor_name}
								onChange={(e) =>
									setsponsorForm({
										sponsor_name: e.target.value,
									})
								}
							/>
						</Form.Item>
					</Form>
				</Modal>
			)}

			{sponsorModalEdit && (
				<Modal
					visible={sponsorModalEdit}
					title={`Edit Sponsor\n${sponsorFormEdit.name}`}
					footer={[
						<Button key='cancel' type='dashed' danger onClick={() => setSponsorModalEdit(false)}>
							Cancel
						</Button>,
						<Button key='submit' type='primary' onClick={() => handleEditSponsor()}>
							Submit
						</Button>,
					]}
				>
					<Form>
						<Form.Item label='Sponsor Name' name='sponsor_name' labelCol={{ span: 24 }}>
							<Input
								placeholder='sponsor name'
								name='new_sponsor_name'
								value={sponsorFormEdit.new_sponsor_name}
								defaultValue={sponsorFormEdit.name}
								onChange={(e) =>
									setsponsorFormEdit({
										...sponsorFormEdit,
										new_sponsor_name: e.target.value,
									})
								}
							/>
						</Form.Item>
					</Form>
				</Modal>
			)}
		</Row>
	);
};

export default SponsorConfig;
