import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import moment from 'moment';

import FileBase64 from 'react-file-base64';
import { AdminTable, PopupComponent } from './modules';
import { Image, Divider } from 'antd';
import {
	Row,
	Col,
	ColumnList,
	Tooltip,
	Popconfirm,
	Button,
	Tag,
	Form,
	Input,
	Select,
	DatePicker,
	message,
} from 'components';

import SearchModule from './searchModule';

import {
	createCompany,
	deleteCompany,
	getDetailCompany,
	getListCompany,
	updateCompany,
	searchCompany,
} from 'store/actions/adminCompanyActions';

const FormItem = ({ type, name, label, value, onChange, defaultValue }) => {
	return (
		<Form.Item
			labelCol={{ span: 24 }}
			name={name}
			label={<span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{label}:</span>}
		>
			{type == 'text' && <Input style={{ width: '100%' }} placeholder={label} value={value} onChange={onChange} />}

			{type == 'address' && (
				<Input
					type='textarea'
					style={{ width: '100%' }}
					placeholder={label}
					autoSize={{ minRows: 4, maxRows: 4 }}
					value={value}
					defaultValue={defaultValue}
					onChange={onChange}
				/>
			)}

			{type == 'phone' && (
				<Input
					type='number'
					style={{ width: '100%' }}
					placeholder={label}
					defaultValue={defaultValue}
					value={value}
					onChange={onChange}
				/>
			)}

			{type == 'date' && (
				<DatePicker
					locale={'id_ID'}
					value={value}
					defaultValue={defaultValue}
					placeholder={label}
					name={name}
					onChange={onChange}
				/>
			)}

			{type == 'status' && (
				<Select
					defaultValue={defaultValue}
					value={value}
					onChange={onChange}
					placeholder={label}
					options={[
						{
							value: 'ACTIVE',
							label: 'Active',
						},
						{
							value: 'INACTIVE',
							label: 'Inactive',
						},
						{
							value: 'TRIAL',
							label: 'Trial',
						},
					]}
				/>
			)}

			{type == 'upload' && <FileBase64 id={name} multiple={false} onDone={onChange} />}
		</Form.Item>
	);
};

const CompanyList = () => {
	const dispatch = useDispatch();
	const adminCompany = useSelector((state) => state.adminCompany);
	const { adminListCompany } = adminCompany;

	const [companyFilter, setCompanyFilter] = useState({
		order: 'ASC',
		order_by: 'company',
		types: 'company',
		current: 0,
		pageSize: 10,
	});

	const [openCreate, setOpenCreate] = useState(false);
	const [openDetail, setOpenDetail] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);

	const [companyForm, setCompanyForm] = useState({});
	const [companyDetail, setCompanyDetail] = useState({});
	const [searchForm, setSearchForm] = useState('');

	const [listData, setlistData] = useState({
		data: adminListCompany.result.data,
	});

	useEffect(() => {
		if (!adminListCompany.loaded) {
			dispatch(
				getListCompany({
					...companyFilter,
					page: companyFilter.current + 1,
					max_size: companyFilter.pageSize,
				}),
			);
		}
	}, []);

	useEffect(() => {
		setlistData({data: adminListCompany.result.data});
	}, [adminListCompany.result]);

	const getImage = (files) => {
		setCompanyDetail({
			...companyDetail,
			filename: files.name,
			base64: files.base64,
		});
	};

	const handleCreateCompany = () => {
		let payload = {
			status: companyForm.status,
			name: companyForm.name,
			address: companyForm.address,
			phone: companyForm.phone,
			contact: companyForm.contact_person,
			expired: companyForm.expired_date,
			email: companyForm.email,
			limit_keyword: companyForm.limit_keyword,
			icon: companyForm.icon,
		};

		createCompany(payload)
			.then((res) => res.json())
			.then((res) => {
				setOpenCreate(false);
				setCompanyForm({});
				message.info(res.message);
				dispatch(
					getListCompany({
						...companyFilter,
						page: companyFilter.current + 1,
						max_size: companyFilter.pageSize,
					}),
				);
			})
			.catch((err) => {
				return err;
			});
	};

	const handleOpenDetail = (value) => {
		getDetailCompany({ id: value.id, types: companyFilter.types })
			.then((res) => res.json())
			.then((res) => {
				let companyData = res.data;

				companyData.map((item) => {
					setCompanyDetail({
						...item,
						total_keyword: value.total_keyword,
					});
				});
				setOpenDetail(true);
			})
			.catch((err) => {
				err;
			});
	};

	const handleUpdateCompany = () => {
		let payload = {
			id: companyDetail.comp_id,
			status: companyDetail.status,
			name: companyDetail.comp_name,
			address: companyDetail.address,
			phone: companyDetail.phone,
			contact: companyDetail.contact_person,
			expired: companyDetail.expired,
			email: companyDetail.email,
			limit_keyword: companyDetail.limit_keyword,
			icon: [
				{
					filename: undefined,
					base64: undefined,
				},
			],
		};

		if (companyDetail.filename) {
			payload = {
				id: companyDetail.comp_id,
				status: companyDetail.status,
				name: companyDetail.comp_name,
				address: companyDetail.address,
				phone: companyDetail.phone,
				contact: companyDetail.contact_person,
				expired: companyDetail.expired,
				email: companyDetail.email,
				limit_keyword: companyDetail.limit_keyword,
				icon: [
					{
						filename: companyDetail.filename,
						base64: companyDetail.base64,
					},
				],
			};
		}
		console.log(payload);
		updateCompany(payload)
			.then((res) => res.json())
			.then((res) => {
				message.info(res.message);
				setOpenDetail(false);
				setOpenUpdate(false);
				dispatch(
					getListCompany({
						...companyFilter,
						page: companyFilter.current + 1,
						max_size: companyFilter.pageSize,
					}),
				);
			})
			.catch((err) => {
				return err;
			});
	};

	const handleDeleteCompany = (value) => {
		let payload = {
			id: value.id,
		};
		console.log(payload);
		deleteCompany(payload)
			.then((res) => res.json())
			.then((res) => {
				message.info(res.message);
				dispatch(
					getListCompany({
						...companyFilter,
						page: companyFilter.current + 1,
						max_size: companyFilter.pageSize,
					}),
				);
			})
			.catch((err) => {
				return err;
			});
	};

	const handleSearch = (searchText) => {
		const filteredData = adminListCompany.result.data.filter(({ company_name }) => {
			company_name = company_name.toLowerCase();
			return company_name.includes(searchText);
		});

		setlistData({
			data: filteredData,
		});

		console.log(filteredData);
	};

	return (
		<Row>
			<Col span={24}>
				<Row>
					<Col span={12}>
						<SearchModule placeholder='search company' onSearch={handleSearch} />
					</Col>
					<Col>
						<Button type='dashed' icons='PlusCircleOutlined' onClick={() => setOpenCreate(true)}>
							Create
						</Button>
					</Col>
				</Row>
			</Col>

			<Col span={24}>
				<AdminTable
					tables={{
						data: listData?.data,
						rowKey: (record) => {
							return record.id;
						},
						pagination: {
							showSizeChanger: true,
							defaultCurrent: companyFilter.current + 1,
							defaultPageSize: companyFilter.pageSize,
							total: adminListCompany.result.total_user,
							showTotal: (total) => `Total ${total} items`,
							onChange: (pages, PageSizes) => {
								setCompanyFilter({
									...companyFilter,
									current: pages - 1,
									pageSize: PageSizes,
								});
								dispatch(
									getListCompany({
										...companyFilter,
										page: companyFilter.current,
										max_size: companyFilter.pageSize,
									}),
								);
							},
						},
						column: [
							{
								title: 'User List',
								render: (record) => (
									<>
										<ColumnList title='company' ellipsis content={record.company_name} />
										<ColumnList title='expired' content={record.expired} />
										<ColumnList
											title='keyword'
											content={`${record.total_keyword}\n/\n${
												record.limit_keyword == 0
													? 'unlimited'
													: record.limit_keyword == null
													? '-'
													: record.limit_keyword
											}`}
										/>
										<ColumnList title='status' content={record.status} />
										<ColumnList title='action' type='action'>
											<Button size='small' icons='EditOutlined' onClick={() => console.log()} />
											<Popconfirm
												title='Are you sure to delete this?'
												onConfirm={() => handleDeleteCompany(record)}
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
								title: 'Expired',
								dataIndex: 'expired',
								width: 120,
								responsive: ['md'],
								defaultSortOrder: 'descend',
								sortDirections: ['descend', 'ascend'],
								sorter: (a, b) => a.expired.localeCompare(b.expired),
							},
							{
								title: 'Company',
								dataIndex: 'company_name',
								responsive: ['md'],
								sorter: (a, b) => a.company_name.localeCompare(b.company_name),
								defaultSortOrder: 'ascend',
								sortDirections: ['descend', 'ascend'],
							},
							{
								title: 'Status',
								dataIndex: 'status',
								width: 130,
								responsive: ['md'],
								defaultSortOrder: 'ascend',
								sortDirections: ['descend', 'ascend'],
								sorter: (a, b) => a.status.localeCompare(b.status),
								render: (text) => {
									return text;
								},
							},
							{
								title: (
									<Tooltip title='total keyword / limit keyword' placement='top'>
										Keyword
									</Tooltip>
								),
								dataIndex: 'total_keyword',
								width: 130,
								responsive: ['md'],
								render: (text, record) => {
									return (
										<>
											{text}
											{`\n/\n`}
											{record.limit_keyword == 0
												? 'unlimited'
												: record.limit_keyword == null
												? '-'
												: record.limit_keyword}
										</>
									);
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
											<Button size='small' icons='EditOutlined' onClick={() => handleOpenDetail(record)} />
										</Tooltip>
										<Popconfirm
											title='Are you sure to delete this?'
											onConfirm={() => handleDeleteCompany(record)}
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
				submit={handleCreateCompany}
				onClose={() => {
					setOpenCreate(false);
					setCompanyForm({});
				}}
			>
				<Row gutter={[12, 0]} justify='center'>
					<Col span={24}>
						<FormItem
							type='text'
							label='company name'
							name='name'
							value={companyForm.name}
							onChange={(e) => {
								setCompanyForm({
									...companyForm,
									name: e.target.value,
								});
							}}
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12}>
						<FormItem
							type='text'
							label='contact person'
							name='contact_person'
							value={companyForm.contact_person}
							onChange={(e) => {
								setCompanyForm({
									...companyForm,
									contact_person: e.target.value,
								});
							}}
						/>
						<FormItem
							type='phone'
							label='phone'
							name='phone'
							defaultValue={companyForm.phone}
							onChange={(e) => {
								setCompanyForm({
									...companyForm,
									phone: e.target.value,
								});
							}}
						/>
						<FormItem
							type='text'
							label='email'
							name='email'
							value={companyForm.email}
							onChange={(e) => {
								setCompanyForm({
									...companyForm,
									email: e.target.value,
								});
							}}
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12}>
						<FormItem
							type='date'
							label='expired'
							name='expired_date'
							defaultValue={companyForm.expired_date}
							placeholder='expired date'
							onChange={(e) => {
								setCompanyForm({
									...companyForm,
									expired_date: e.format('YYYY-MM-DD'),
								});
							}}
						/>

						<FormItem
							type='status'
							label='status'
							name='status'
							value={companyForm.status}
							onChange={(value) => {
								setCompanyForm({
									...companyForm,
									status: value,
								});
							}}
						/>
						<FormItem
							type='phone'
							label='limit keyword'
							name='limit_keyword'
							value={companyForm.limit_keyword}
							onChange={(e) => {
								setCompanyForm({
									...companyForm,
									limit_keyword: e.target.value,
								});
							}}
						/>
					</Col>

					<Col span={24}>
						<FormItem
							type='upload'
							label='logo'
							name='logo'
							onChange={(files) => {
								setCompanyForm({
									...companyForm,
									icon: [
										{
											filename: files.name,
											base64: files.base64,
										},
									],
								});
							}}
						/>
						<FormItem
							type='address'
							label='address'
							name='address'
							value={companyForm.address}
							onChange={(e) => {
								setCompanyForm({
									...companyForm,
									address: e.target.value,
								});
							}}
						/>
					</Col>
				</Row>
			</PopupComponent.Create>

			<PopupComponent
				title={`Detail\n${companyDetail.comp_name}`}
				isOpen={openDetail}
				onClose={() => {
					setOpenDetail(false);
					setOpenUpdate(false);
				}}
				submitDisable={openUpdate == false ? true : false}
				submit={handleUpdateCompany}
			>
				<Form>
					<Row gutter={[12, 12]} align='middle' justify='center'>
						<Col>
							<div style={logoWrap}>
								<div style={logoContent}>
									<Image
										style={{ position: 'relative', width: '100%', height: 'auto' }}
										preview={false}
										src={
											companyDetail.company_logo ? `https://api.digivla.id/media/${companyDetail.company_logo}` : null
										}
										alt=''
									/>
								</div>
								<span style={{ fontWeight: 500 }}>{`ID:\n${companyDetail.comp_id}`}</span>
							</div>
						</Col>
						<Col span={24}>
							<Divider>
								<label style={{ fontWeight: 500, textTransform: 'capitalize' }}>
									{openUpdate ? 'Update' : 'Detail'} Company
								</label>
							</Divider>
							{!openUpdate ? (
								<Col span={24}>
									<Row gutter={[12, 0]}>
										<Col xs={24} sm={24} md={12} lg={12}>
											<ColumnList title='contact person' content={companyDetail.contact_person} />
											<ColumnList title='phone' content={companyDetail.phone} />
											<ColumnList title='email' content={companyDetail.email} />
										</Col>
										<Col xs={24} sm={24} md={12} lg={12}>
											<ColumnList title='registration' content={companyDetail.registration_date} />
											<ColumnList title='expired' content={companyDetail.expired} />
											<ColumnList title='status' content={companyDetail.status} />
										</Col>
										<Col xs={24} sm={24} md={12} lg={12}>
											<ColumnList
												title='keyword'
												content={`${companyDetail.total_keyword}\n/\n${
													companyDetail.limit_keyword == 0 ? 'unlimited' : companyDetail.limit_keyword
												}`}
											/>
										</Col>
										<Col xs={24} sm={24} md={12} lg={12}>
											<ColumnList
												title='created by'
												content={companyDetail.created_by == null ? '-' : companyDetail.created_by}
											/>
										</Col>
										<Col span={24}>
											<ColumnList title='address' ellipsis content={companyDetail.address} />
										</Col>
									</Row>
								</Col>
							) : (
								<Row gutter={[12, 0]} justify='center'>
									<Col span={24}>
										<FormItem
											type='text'
											label='company name'
											name='comp_name'
											value={companyDetail.comp_name}
											onChange={(e) => {
												setCompanyDetail({
													...companyDetail,
													comp_name: e.target.value,
												});
											}}
										/>
									</Col>
									<Col xs={24} sm={24} md={12} lg={12}>
										<FormItem
											type='text'
											label='contact person'
											name='contact_person'
											value={companyDetail.contact_person}
											onChange={(e) => {
												setCompanyDetail({
													...companyDetail,
													contact_person: e.target.value,
												});
											}}
										/>
										<FormItem
											type='phone'
											label='phone'
											name='phone'
											defaultValue={companyDetail.phone}
											onChange={(e) => {
												setCompanyDetail({
													...companyDetail,
													phone: e.target.value,
												});
											}}
										/>
										<FormItem
											type='text'
											label='email'
											name='email'
											value={companyDetail.email}
											onChange={(e) => {
												setCompanyDetail({
													...companyDetail,
													email: e.target.value,
												});
											}}
										/>
									</Col>
									<Col xs={24} sm={24} md={12} lg={12}>
										<FormItem
											type='date'
											label='expired'
											name='expired'
											defaultValue={moment(companyDetail.expired)}
											onChange={(e) => {
												setCompanyDetail({
													...companyDetail,
													expired: e.format('YYYY-MM-DD'),
												});
											}}
										/>
										<FormItem
											type='status'
											label='status'
											name='status'
											defaultValue={companyDetail.status}
											onChange={(value) => {
												setCompanyDetail({
													...companyDetail,
													status: value,
												});
											}}
										/>
										<FormItem
											type='phone'
											label='limit keyword'
											name='limit_keyword'
											defaultValue={companyDetail.limit_keyword}
											onChange={(e) => {
												setCompanyDetail({
													...companyDetail,
													limit_keyword: e.target.value,
												});
											}}
										/>
									</Col>

									<Col span={24}>
										<FormItem type='upload' label='logo' name='logo' onChange={(e) => getImage(e)} />
										<FormItem
											type='address'
											label='address'
											name='address'
											defaultValue={companyDetail.address}
											onChange={(e) => {
												setCompanyDetail({
													...companyDetail,
													address: e.target.value,
												});
											}}
										/>
									</Col>
								</Row>
							)}
						</Col>
						<Col span={8}>
							<Button type='dashed' block onClick={() => setOpenUpdate(!openUpdate)}>
								{!openUpdate ? 'Update' : 'Detail'}
							</Button>
						</Col>
					</Row>
				</Form>
			</PopupComponent>
		</Row>
	);
};

const logoWrap = {
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	rowGap: '6px',
};

const logoContent = {
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '85px',
	width: '85px',
};

export default CompanyList;
