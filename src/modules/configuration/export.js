import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	Row,
	Col,
	Card,
	Table,
	ColumnList,
	Popconfirm,
	Button,
	Form,
	Input,
	Select,
	Modal,
	notification,
	message,
} from 'components';

import {
	createExcelColumn,
	deleteExcelColumn,
	getExcelColumn,
	updateExcelColumn,
} from 'store/actions/excellcolActions';

const ExportConfig = () => {
	const dispatch = useDispatch();
	const excellconfig = useSelector((state) => state.excellconfig);
	const { excelCol } = excellconfig;

	useEffect(() => {
		if (!excelCol.loaded) {
			dispatch(getExcelColumn());
		}
	}, []);

	const [modalCreate, setModalCreate] = useState(false);
	const [modalEdit, setModalEdit] = useState(false);
	const [newColumn, setNewColumn] = useState({
		name: '',
		auto_check: false,
	});

	const [detailColumn, setDetailColumn] = useState({});

	const handleCreate = () => {
		createExcelColumn(newColumn)
			.then((data) => data.json())
			.then((data) => {
				message.info(data.message);
				dispatch(getExcelColumn());
				setModalEdit(false);
			})
			.catch((err) => message.info(err.message));
	};

	const handleDelete = (id) => {
		deleteExcelColumn(id)
			.then((data) => data.json())
			.then((data) => {
				message.info(data.message);
				dispatch(getExcelColumn());
				setModalEdit(false);
			})
			.catch((err) => message.info(err.message));
	};

	const handleOpenEdit = (id, value) => {
		setModalEdit(true);
		setDetailColumn({ id: value.id, name: value.name, auto_check: value.checked });
	};

	const handleUpdateColumn = (e) => {
		updateExcelColumn(detailColumn)
			.then((data) => data.json())
			.then((data) => {
				message.info(data.message);
				dispatch(getExcelColumn());
				setModalEdit(false);
			})
			.catch((err) => message.info(err.message));
	};

	return (
		<>
			<Row style={{ height: '100%' }}>
				<Col span={24}>
					<Row justify='space-between'>
						<Col flex='100px'>
							<Button type='dashed' block icons='PlusCircleOutlined' onClick={() => setModalCreate(true)}>
								Column
							</Button>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Table
						data={excelCol.result.data}
						rowKey={(record) => {
							return record.id;
						}}
						pagination={{
							total: excelCol.result.length,
							showTotal: (total) => `Total ${total} Column`,
						}}
						columns={[
							{
								title: 'Export Column',
								render: (record) => (
									<Fragment>
										<ColumnList title='Column Name' content={record.name} />
										<ColumnList title='Status' content={record.checked == true ? 'auto check' : 'manual check'} />
										<ColumnList title='action' type='action'>
											<Button size='small' icons='EditOutlined' />
											<Popconfirm
												title='Are you sure to delete this?'
												onConfirm={() => handleDelete(record.id)}
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
								title: 'Column Name',
								dataIndex: 'name',
								defaultSortOrder: 'ascend',
								sorter: function (a, b) {
									return a.name.toString().localeCompare(b.name);
								},
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
											onConfirm={() => handleDelete(record.id)}
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
			</Row>

			<Modal
				closable
				visible={modalEdit}
				title={`Export Column: ${detailColumn.name}`}
				onCancel={() => setModalEdit(false)}
				footer={[
					<Button key='submit' type='primary' onClick={(e) => handleUpdateColumn(e)}>
						Update
					</Button>,
				]}
			>
				<Form>
					<Row>
						<Col xs={24} sm={24} md={12} lg={12}>
							<Form.Item
								label='Column Name'
								name='name'
								labelCol={{
									span: 24,
								}}
							>
								<Input
									defaultValue={detailColumn.name}
									value={detailColumn.name}
									placeholder='Column Name'
									onChange={(e) => {
										setDetailColumn({
											...detailColumn,
											name: e.target.value,
										});
									}}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12}>
							<Form.Item
								label='Status'
								name='auto_check'
								labelCol={{
									span: 24,
								}}
							>
								<Select
									defaultValue={detailColumn.auto_check}
									placeholder='column status'
									onChange={(value) =>
										setDetailColumn({
											...detailColumn,
											auto_check: value,
										})
									}
								>
									<Select.Option value={true}>Auto Check</Select.Option>
									<Select.Option value={false}>Manual Check</Select.Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>

			<Modal
				closable
				visible={modalCreate}
				title='Export Column'
				onCancel={() => setModalCreate(false)}
				footer={[
					<Button key='submit' type='primary' disabled={newColumn.name == '' ? true : false} onClick={handleCreate}>
						Submit
					</Button>,
				]}
			>
				<Form>
					<Row>
						<Col xs={24} sm={24} md={12} lg={12}>
							<Form.Item
								label='Column Name'
								name='name'
								labelCol={{
									span: 24,
								}}
							>
								<Input
									value={newColumn.name}
									placeholder='Column Name'
									onChange={(e) => {
										setNewColumn({
											...newColumn,
											name: e.target.value,
										});
									}}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12}>
							<Form.Item
								label='Status'
								name='auto_check'
								labelCol={{
									span: 24,
								}}
							>
								<Select
									value={newColumn.auto_check}
									placeholder='column status'
									onChange={(value) =>
										setNewColumn({
											...newColumn,
											auto_check: value,
										})
									}
								>
									<Select.Option value={true}>Auto Check</Select.Option>
									<Select.Option value={false}>Manual Check</Select.Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	);
};

export default ExportConfig;
