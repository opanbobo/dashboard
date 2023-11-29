import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { Divider } from 'antd';
import { ColumnList, Button, Popconfirm, Tooltip, Tag, Input, Form, Row, Col, notification } from 'components';

import { CompanySelect, LevelSelect, AccessMenu, AdminTable, PopupComponent } from './modules';
import { getAdminList, getAdminDetail, updateUser, createUser, deleteUser } from 'store/actions/adminActions';

import { getAdminMenu } from 'store/actions/menuActions';

const userFilter = {
	order: 'ASC',
	order_by: 'company',
	types: 'user',
};

const FormItem = ({ type, name, label, value, defaultValue, onChange, selectAll, group }) => {
	return (
		<Form.Item
			labelCol={{ span: 24 }}
			name={name}
			label={<span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{label}:</span>}
		>
			{type == 'text' && <Input style={{ width: '100%' }} placeholder={label} value={value} onChange={onChange} />}

			{type == 'password' && (
				<Input type='password' style={{ width: '100%' }} placeholder={'password'} value={value} onChange={onChange} />
			)}

			{type == 'company' && (
				<CompanySelect
					style={{ width: '100%' }}
					placeholder={label}
					defaultValue={defaultValue}
					value={value}
					onChange={onChange}
				/>
			)}

			{type == 'level' && (
				<LevelSelect placeholder={label} defaultValue={defaultValue} value={value} onChange={onChange} />
			)}

			{type == 'access' && <AccessMenu selectAll={selectAll} group={group} />}
		</Form.Item>
	);
};

const UserList = () => {
	const dispatch = useDispatch();
	const adminReducers = useSelector((state) => state.adminReducers);
	const menuReducers = useSelector((state) => state.menuReducers);

	const { adminListUser } = adminReducers;
	const { menuList } = menuReducers;

	const [indeterminate, setIndeterminate] = useState(true);

	const [openCreate, setopenCreate] = useState(false);
	const [userForm, setUserForm] = useState({});

	const [openUpdate, setOpenUpdate] = useState(false);
	const [openDetail, setOpenDetail] = useState(false);
	const [infoDetail, setInfoDetail] = useState({});

	const [page, setPage] = useState({
		current: 0,
		pageSize: 10,
	});
	const [filter, setFilter] = useState({ ...userFilter });

	useEffect(() => {
		if (!adminListUser.loaded) {
			dispatch(
				getAdminList({
					...filter,
					page: page.current + 1,
					max_size: page.pageSize,
				}),
			);
		}
	}, []);

	const handleOpenDetail = (id) => {
		setOpenDetail(true);

		getAdminDetail({ id: id, types: 'user' })
			.then((res) => res.json())
			.then((res) => {
				let userData = {};
				let listMenu = [];

				res.data.map((item) => {
					userData = item;
					item.list_menu.forEach((element) => {
						listMenu.push(element);
					});
				});

				setInfoDetail({
					id: id,
					full_name: userData.full_name,
					email: userData.email,
					username: userData.username,
					company: userData.company,
					company_id: userData.company_id,
					level_menu: userData.level,
					list_menu: listMenu,
				});
			})
			.catch((err) => {
				err;
			});
	};

	const handleUpdateUser = () => {
		const payload = {
			id: infoDetail.id,
			full_name: infoDetail.full_name,
			password: infoDetail.password,
			email: infoDetail.email,
			username: infoDetail.username,
			level_menu: infoDetail.level_menu,
			menu: infoDetail.list_menu,
		};

		if (payload.password == null) {
			payload = {
				id: infoDetail.id,
				full_name: infoDetail.full_name,
				email: infoDetail.email,
				username: infoDetail.username,
				level_menu: infoDetail.level_menu,
				menu: infoDetail.list_menu,
			};
		}

		updateUser(payload)
			.then((res) => res.json())
			.then((res) => {
				setOpenDetail(false);

				notification.info({
					message: res.message,
				});
				dispatch(
					getAdminList({
						...filter,
						page: page.current,
						max_size: page.pageSize,
					}),
				);
			})
			.catch((err) => {
				err;
			});
	};

	const handleOpenCreate = () => {
		setopenCreate(true);
		dispatch(getAdminMenu());
	};

	const handleCreateUser = () => {
		const payload = {
			full_name: userForm.full_name,
			company: userForm.company,
			email: userForm.email,
			username: userForm.username,
			password: userForm.password,
			level_menu: userForm.level_menu,
			menu: userForm.menu ? userForm.menu : [],
		};

		createUser(payload)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setopenCreate(false);

				notification.info({
					message: res.message,
				});
				dispatch(
					getAdminList({
						...filter,
						page: page.current,
						max_size: page.pageSize,
					}),
				);
			})
			.catch((err) => {
				err;
			});
	};

	const handleDeleteUser = (value) => {
		const payload = {
			id: value.id,
			username: value.usrname,
		};

		deleteUser(payload)
			.then((res) => res.json())
			.then((res) => {
				notification.info({ message: res.message });
				dispatch(
					getAdminList({
						...filter,
						page: page.current,
						max_size: page.pageSize,
					}),
				);
			})
			.catch((err) => {
				err;
			});
	};

	return (
		<Row>
			<Col>
				<Button icons='PlusCircleOutlined' onClick={handleOpenCreate}>
					Create
				</Button>
			</Col>
			<Col span={24}>
				<AdminTable.User
					tables={{
						data: adminListUser.result.data,
						rowKey: (record) => record.id,
						pagination: {
							defaultCurrent: page.current + 1,
							defaultPageSize: page.pageSize,
							total: adminListUser.result.total_user,
							showTotal: (total) => `Total ${total} items`,
							onChange: (pages, PageSizes) => {
								dispatch(
									getAdminList({
										...filter,
										page: pages - 1,
										max_size: PageSizes,
									}),
								);
								setPage({
									...page,
									current: pages - 1,
									pageSize: PageSizes,
								});
							},
						},
						column: [
							{
								title: 'User List',
								render: (record) => (
									<>
										<ColumnList title='company' ellipsis content={record.company} />
										<ColumnList title='Name' content={record.name} />
										<ColumnList title='username' content={record.usrname} />
										<ColumnList title='level' content={record.level} />
										<ColumnList title='action' type='action'>
											<Button size='small' icons='EditOutlined' onClick={() => handleOpenDetail(record.id)} />
											<Popconfirm
												title='Are you sure to delete this?'
												onConfirm={() => handleDeleteUser(record)}
												onCancel={() => {
													console.log('cancel delete');
												}}
											>
												<Button size='small' icons='DeleteOutlined' type='dashed' danger='true' />
											</Popconfirm>
										</ColumnList>
									</>
								),
								responsive: ['xs'],
							},
							{
								title: 'Name',
								dataIndex: 'name',
								width: 200,
								responsive: ['md'],
								defaultSortOrder: 'descend',
								sortDirections: ['descend', 'ascend'],
								sorter: (a, b) => a.name.localeCompare(b.name),
							},
							{
								title: 'Username',
								dataIndex: 'usrname',
								width: 200,
								responsive: ['md'],
								sorter: (a, b) => a.usrname.localeCompare(b.usrname),
								defaultSortOrder: 'ascend',
								sortDirections: ['descend', 'ascend'],
							},
							{
								title: 'Company',
								dataIndex: 'company',
								responsive: ['md'],
								sorter: (a, b) => a.company.localeCompare(b.company),
							},
							{
								title: 'Level',
								dataIndex: 'level',
								width: 120,
								responsive: ['md'],
								render: (text) => {
									return <Tag style={{ width: '100%', textAlign: 'center' }}>{text}</Tag>;
								},
							},
							{
								title: 'Action',
								key: 'action',
								width: 90,
								align: 'center',
								responsive: ['md'],
								render: (text, record) => (
									<ColumnList type='action'>
										<Tooltip title='detail user' placement='left'>
											<Button size='small' icons='EditOutlined' onClick={() => handleOpenDetail(record.id)} />
										</Tooltip>
										<Popconfirm
											title='Are you sure to delete this?'
											onConfirm={() => handleDeleteUser(record)}
											onCancel={() => {
												console.log('cancel delete');
											}}
										>
											<Button size='small' icons='DeleteOutlined' type='dashed' danger='true' />
										</Popconfirm>
									</ColumnList>
								),
							},
						],
					}}
				/>
			</Col>

			<PopupComponent.Create
				isOpen={openCreate}
				submit={handleCreateUser}
				onClose={() => {
					setopenCreate(false);
					setUserForm({});
				}}
			>
				<Form>
					<Row gutter={[12, 0]} align='middle' justify='center'>
						<Col span={24}>
							<FormItem
								type='company'
								label='company'
								value={userForm.company}
								onChange={(value) =>
									setUserForm({
										...userForm,
										company: value,
									})
								}
							/>
							<FormItem
								type='text'
								label='email'
								value={userForm.email}
								onChange={(e) =>
									setUserForm({
										...userForm,
										email: e.target.value,
									})
								}
							/>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12}>
							<FormItem
								type='text'
								label='Name'
								value={userForm.full_name}
								onChange={(e) =>
									setUserForm({
										...userForm,
										full_name: e.target.value,
									})
								}
							/>
							<FormItem
								type='level'
								label='User Level'
								value={userForm.level_menu}
								onChange={(value) => {
									setUserForm({
										...userForm,
										level_menu: value,
									});
								}}
							/>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12}>
							<FormItem
								type='text'
								label='Username'
								value={userForm.username}
								onChange={(e) =>
									setUserForm({
										...userForm,
										username: e.target.value,
									})
								}
							/>
							<FormItem
								type='password'
								label='password'
								value={userForm.password}
								onChange={(e) =>
									setUserForm({
										...userForm,
										password: e.target.value,
									})
								}
							/>
						</Col>

						<Col span={24}>
							<FormItem
								type='access'
								label='access menu'
								selectAll={{
									disabled: userForm.level_menu != 4 ? true : false,
									indeterminate: indeterminate,
									label: 'Select All',
									checked: userForm.menu?.length == menuList.result.data?.length ? true : false,
									onChange: (e) => {
										setIndeterminate(false);
										e.target.checked
											? setUserForm({
													...userForm,
													menu: menuList.result.data.map((e) => e),
											  })
											: setUserForm({
													...userForm,
													menu: [],
											  });
									},
								}}
								group={{
									disabled: userForm.level_menu != 4 ? true : false,
									value: userForm.menu,
									options: menuList.result.data
										? menuList.result.data.map((item) => {
												return {
													value: item,
													label: item,
												};
										  })
										: [],
									onChange: (list) => {
										setUserForm({
											...userForm,
											menu: list,
										});
									},
								}}
							/>
						</Col>
					</Row>
				</Form>
			</PopupComponent.Create>

			<PopupComponent
				title={`Detail ${infoDetail.full_name}`}
				isOpen={openDetail}
				onClose={() => {
					setOpenDetail(false);
					setOpenUpdate(false);
				}}
				submit={handleUpdateUser}
				submitDisable={openUpdate == false ? true : false}
			>
				<Form>
					<Row>
						<Col span={24}>
							<Row gutter={[12, 0]}>
								<Col span={24}>
									<ColumnList title='company' content={infoDetail.company} />
								</Col>
								<Col xs={24} sm={24} md={12} lg={12}>
									<ColumnList title='Name' content={infoDetail.full_name} />
									<ColumnList title='level' content={LevelSelect.Tag(infoDetail.level_menu)} />
								</Col>
								<Col xs={24} sm={24} md={12} lg={12}>
									<ColumnList title='username' content={infoDetail.username} />
									<ColumnList title='email' content={infoDetail.email} />
								</Col>
							</Row>
						</Col>
						<Col span={24}>
							<Button
								block
								type='dashed'
								onClick={() => {
									setOpenUpdate(!openUpdate);
									dispatch(getAdminMenu());
								}}
							>
								{openUpdate ? 'Close' : 'Update'}
							</Button>
						</Col>
						{openUpdate == true ? (
							<Col span={24}>
								<ColumnList
									ellipsis
									style={{ border: '1px dashed red', borderRadius: 4, padding: 10 }}
									content={
										<Row gutter={[12, 0]} align='middle' justify='center'>
											<Divider>
												<label style={{ fontWeight: 500, textTransform: 'capitalize' }}>Update Form</label>
											</Divider>

											<Col span={24}>
												<FormItem
													type='text'
													label='email'
													value={infoDetail.email}
													onChange={(e) =>
														setInfoDetail({
															...infoDetail,
															email: e.target.value,
														})
													}
												/>
											</Col>
											<Col xs={24} sm={24} md={12} lg={12}>
												<FormItem
													type='text'
													label='Name'
													value={infoDetail.full_name}
													onChange={(e) =>
														setInfoDetail({
															...infoDetail,
															full_name: e.target.value,
														})
													}
												/>
												<FormItem
													type='level'
													label='User Level'
													defaultValue={infoDetail.level_menu}
													onChange={(value) => {
														setInfoDetail({
															...infoDetail,
															level_menu: value,
														});
													}}
												/>
											</Col>
											<Col xs={24} sm={24} md={12} lg={12}>
												<FormItem
													type='text'
													label='Username'
													value={infoDetail.username}
													onChange={(e) =>
														setInfoDetail({
															...infoDetail,
															username: e.target.value,
														})
													}
												/>
												<FormItem
													type='password'
													label='password'
													value={infoDetail.password}
													onChange={(e) =>
														setInfoDetail({
															...infoDetail,
															password: e.target.value,
														})
													}
												/>
											</Col>

											<Col span={24}>
												<FormItem
													type='access'
													label='access menu'
													selectAll={{
														disabled: infoDetail.level_menu != 4 ? true : false,
														indeterminate: indeterminate,
														label: 'Select All',
														checked: infoDetail.list_menu?.length == menuList.result.data?.length ? true : false,
														onChange: (e) => {
															setIndeterminate(false);
															e.target.checked
																? setInfoDetail({
																		...infoDetail,
																		list_menu: menuList.result.data.map((e) => e),
																  })
																: setInfoDetail({
																		...infoDetail,
																		list_menu: infoDetail.list_menu.map((item) => item),
																  });
														},
													}}
													group={{
														disabled: infoDetail.level_menu != 4 ? true : false,
														value: infoDetail.list_menu,
														options: menuList.result.data
															? menuList.result.data.map((item) => {
																	return {
																		value: item,
																		label: item,
																	};
															  })
															: [],
														onChange: (list) => {
															setIndeterminate(!!list.length && list.length < infoDetail.list_menu.length);
															setInfoDetail({
																...infoDetail,
																list_menu: list,
															});
														},
													}}
												/>
											</Col>
										</Row>
									}
								/>
							</Col>
						) : null}
					</Row>
				</Form>
			</PopupComponent>
		</Row>
	);
};

export default UserList;
