import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	Table,
	ColumnList,
	gutter,
	Button,
	Modal,
	Input,
	Tree,
	Form,
	Popconfirm,
	DatePicker,
	Drawer,
	Row,
	Col,
	notification,
} from 'components';
import { treeData } from 'constant/mock/data';

import {
	createConfigSubcat,
	getConfigSubCatList,
	deleteConfigSubcat,
	getKeywordList,
	deleteKeyword,
	updateConfigSubcat,
	createKeyword,
} from 'store/actions/subCategoryAction';
import { getStreamStatus, postStream } from 'store/actions/streamActions';

const ModalDetail = ({
	infoDetail,
	modalEdit,
	keywords,
	handleKeyword,
	configKeywordList,
	handleDeleteKeyword,
	setmodalEdit,
	setkeywords,
	handleUpdate,
	setinfoDetail,
	loadingKey,
}) => {
	useEffect(() => {
		handleKeyword({ target: { value: infoDetail.category_id } }, 'category_id');
	}, [infoDetail]);

	return (
		<Drawer
			title={`Detail ${infoDetail.category_id}`}
			visible={modalEdit && !keywords.loading}
			onClose={() => {
				setmodalEdit(false);
				setkeywords({
					category_id: '',
					keyword: '',
					start_date: '',
					end_date: '',
				});
				setinfoDetail({});
			}}
		>
			<Row>
				<Col span={24}>
					<Row gutter={gutter}>
						<Col xs={24} sm={24} md={18} lg={18}>
							<Input
								placeholder='sub categorygory name'
								suffixIcon='PlusCircleOutlined'
								onChange={(e) => handleKeyword(e, 'category_id')}
								defaultValue={infoDetail.category_id}
							/>
						</Col>
						<Col xs={24} sm={24} md={6} lg={6}>
							<Button block='true' type='primary' onClick={handleUpdate} loading={loadingKey}>
								update
							</Button>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Form>
						<Row gutter={[gutter]}>
							<Col span={24}>
								<Form.Item>
									<label htmlFor='Input'>Keyword</label>
									<Input
										onChange={(e) => handleKeyword(e, 'keyword')}
										name='keyword'
										defaultValue={keywords.keyword}
										placeholder='keyword'
										suffixIcon='EditOutlined'
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item>
									<label htmlFor='Input'>start date</label>
									<DatePicker
										placeholder='start date'
										name='start_date'
										onChange={(e) => handleKeyword({ target: { value: e?.format('YYYY-MM-DD') || '' } }, 'start_date')}
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form.Item>
									<label htmlFor='Input'>expired</label>
									<DatePicker
										name='end_date'
										placeholder='expired'
										onChange={(e) => handleKeyword({ target: { value: e?.format('YYYY-MM-DD') || '' } }, 'end_date')}
									/>
								</Form.Item>
							</Col>
							<Col span={24}>
								{configKeywordList.result.data
									? configKeywordList.result.data.map((item, index) => {
											return (
												<ColumnList
													key={index}
													title={item}
													content={
														<Button
															size='small'
															type='link'
															danger='true'
															icons='DeleteOutlined'
															onClick={() => handleDeleteKeyword(item)}
														></Button>
													}
												/>
											);
									  })
									: []}
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</Drawer>
	);
};

const SubCatList = () => {
	const dispatch = useDispatch();
	const subcategoryConfig = useSelector((state) => state.subcategoryConfig);
	const { configSubcatList, configSubcatCreate, configSubcatDelete, configKeywordList, configKeywordDelete } =
		subcategoryConfig;

	const [modalEdit, setmodalEdit] = useState(false);
	const [modalCreate, setmodalCreate] = useState(false);
	const [modalStream, setModalStream] = useState(false);

	const [infoDetail, setinfoDetail] = useState([]);
	const [streamForm, setStreamForm] = useState({});

	const [subcategory, setsubcategory] = useState({
		category_id: '',
		keyword: '',
	});
	const [keywords, setkeywords] = useState({
		category_id: '',
		keyword: '',
		start_date: '',
		end_date: '',
	});

	const [loadingKey, setLoadingKey] = useState(false);

	const [loading, setloading] = useState(false);

	useEffect(() => {
		dispatch(getConfigSubCatList());
	}, []);

	const OpenCreate = () => setmodalCreate(true);

	const OpenEdit = (id, value) => {
		setmodalEdit(true);
		setinfoDetail(value);

		dispatch(
			getKeywordList({
				category_id: value.category_id,
			}),
		);
	};

	const handleInput = (e) => {
		e.preventDefault();
		const newsubcat = { ...subcategory };
		newsubcat[e.target.id] = e.target.value;
		setsubcategory(newsubcat);
	};

	const handleKeyword = (e, type) => {
		const newkeyword = { ...keywords };
		newkeyword[type] = e.target.value;
		setkeywords(newkeyword);
	};

	const createSubcategory = (e) => {
		if (subcategory.category_id) {
			createConfigSubcat({
				category_id: subcategory.category_id,
			})
				.then((data) => data.json())
				.then((data) => {
					if (data.code == 200) {
						notification.success({ message: 'Success create data' });

						setmodalCreate(false);
						dispatch(getConfigSubCatList());
						setsubcategory({
							...subcategory,
							category_id: '',
						});
					} else {
						notification.error({ message: 'Error when creating data!' });
					}
				})
				.catch((err) => notification.error({ message: 'Error when creating data!' }));
		} else {
			notification.error({ message: 'Error when creating data' });
		}
	};

	const handleUpdate = async () => {
		try {
			setLoadingKey(true);

			if (keywords.category_id !== infoDetail.category_id) {
				if (keywords.category_id) {
					await updateConfigSubcat({
						category_id: infoDetail.category_id,
						new_category_id: keywords.category_id,
					})
						.then((data) => data.json())
						.then((data) => {
							notification.success({ message: 'Success update name' });

							setmodalEdit(false);
							setkeywords({
								category_id: '',
								keyword: '',
								start_date: '',
								end_date: '',
							});
							setinfoDetail({});

							dispatch(getConfigSubCatList());
						})
						.catch((err) =>
							notification.error({
								message: 'Error when trying to update name!',
							}),
						);
				} else {
					notification.error({
						message: 'Error when trying to update name!',
					});
				}
			}

			if (keywords.keyword) {
				if (keywords.start_date && keywords.end_date) {
					await createKeyword(keywords)
						.then((data) => data.json())
						.then((data) => {
							notification.success({ message: 'Success add keyword' });

							dispatch(
								getKeywordList({
									category_id: keywords.category_id,
								}),
							);
						})
						.catch((err) =>
							notification.error({
								message: 'Error when trying to add keyword!',
							}),
						);
				} else {
					notification.error({ message: 'Error when trying to add keyword!' });
				}

				setLoadingKey(false);
			}

			setLoadingKey(false);
		} catch (err) {
			notification.error({ message: 'Error when trying to update data!' });

			setLoadingKey(false);
		}
	};

	const deleteSubcategory = (id) => {
		deleteConfigSubcat({
			category_id: id,
		})
			.then((data) => data.json())
			.then((data) => {
				notification.success({ message: 'Success delete sub category' });

				dispatch(getConfigSubCatList());
			})
			.catch((err) => notification.error({ message: 'Error when deleting sub category!' }));
	};

	const handleDeleteKeyword = (id) => {
		deleteKeyword({
			category_id: infoDetail.category_id,
			keyword: id,
		})
			.then((data) => data.json())
			.then((data) => {
				notification.success({ message: 'Success delete keyword' });

				dispatch(
					getKeywordList({
						category_id: infoDetail.category_id,
					}),
				);
			})
			.catch((err) => notification.error({ message: 'Error when deleting keyword!' }));
	};

	const handleCheckStream = () => {
		const datatemp = {
			start_date: streamForm.start_date,
			end_date: streamForm.end_date,
		};
		getStreamStatus(datatemp)
			.then((data) => data.json())
			.then((data) => {
				notification.success({ message: data.message });
			})
			.catch((err) => {
				notification.error({ message: err.message });
			});
	};

	const handlePostStream = () => {
		const datatemp = {
			start_date: streamForm.start_date,
			end_date: streamForm.end_date,
			sub_category: [streamForm.sub_category],
		};
		
		postStream(datatemp)
			.then((data) => data.json())
			.then((data) => {
				notification.success({ message: data.message });
				setStreamForm({});
				setModalStream(false);
			})
			.catch((err) => {
				notification.error({ message: err.message });
			});
	};

	return (
		<>
			<Row style={{ height: '100%' }}>
				<Col span={24}>
					<Row justify='space-between'>
						<Col xs={24} sm={24} md={5} lg={5} xl={3}>
							<Button block='true' icons='PlusCircleOutlined' type='dashed' onClick={OpenCreate}>
								SubCategory
							</Button>
						</Col>
						<Col xs={24} sm={24} md={5} lg={5} xl={3}>
							<Button block='true' icons='HistoryOutlined' type='primary' onClick={() => setModalStream(true)}>
								Restream
							</Button>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					total subcategory: {configSubcatList.result.count}
					<Table
						data={configSubcatList.result.results}
						rowKey={(record) => {
							return record.category_id;
						}}
						column={[
							{
								title: 'SubCategory List',
								render: (record) => (
									<Fragment>
										<ColumnList title='SubCategory' content={record.category_id} />
										<ColumnList title='action' type='action'>
											<Button size='small' icons='EditOutlined' onClick={() => OpenEdit(record.category_id, record)} />
											<Popconfirm
												title='Are you sure to delete this?'
												onConfirm={() => deleteSubcategory(record.category_id)}
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
								title: 'SubCategory Name',
								dataIndex: 'category_id',
								key: 'category_id',
								sorter: (a, b) => a.category_id.length - b.category_id.length,
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
										<Button size='small' icons='EditOutlined' onClick={() => OpenEdit(record.category_id, record)} />

										<Popconfirm
											title='Are you sure to delete this?'
											onConfirm={() => deleteSubcategory(record.category_id)}
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
				title='Create SubCategory'
				visible={modalCreate}
				footer={[
					<Button key='submit' type='primary' onClick={(e) => createSubcategory(e)}>
						Submit
					</Button>,
					<Button key='back' type='dashed' danger='true' onClick={() => setmodalCreate(false)}>
						Cancel
					</Button>,
				]}
			>
				<Form>
					<Row>
						<Col span={24}>
							<Form.Item>
								<label htmlFor='Input'>SubCategory Name</label>
								<Input
									onChange={(e) => handleInput(e)}
									id='category_id'
									value={subcategory.category_id}
									placeholder='sub category name'
									suffixIcon='PlusCircleOutlined'
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>

			<Modal
				title='Restream'
				visible={modalStream}
				footer={[
					<Button key='check' type='dashed' onClick={() => handleCheckStream()}>
						Check Status
					</Button>,
					<Button key='submit' type='dashed' onClick={() => handlePostStream()}>
						Submit
					</Button>,
					<Button key='back' type='dashed' danger='true' onClick={() => setModalStream(false)}>
						Cancel
					</Button>,
				]}
			>
				<Row>
					<Col span={24}>
						<span style={{ fontWeight: 500 }}>
							Status:{`\n`}
							<span style={{ textTransform: 'capitalize', fontWeight: 'normal' }}>
								{streamForm.status == null
									? 'Input Range date for restream'
									: streamForm.status != null
									? 'you can restream now'
									: 'you can not restream now'}
							</span>
						</span>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12}>
						<Form.Item>
							<label htmlFor='Input'>start date</label>
							<DatePicker
								placeholder='start date'
								name='start_date'
								onChange={(e) =>
									setStreamForm({
										...streamForm,
										start_date: e.format('YYYY-MM-DD'),
									})
								}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12}>
						<Form.Item>
							<label htmlFor='Input'>end date</label>
							<DatePicker
								name='end_date'
								placeholder='expired'
								onChange={(e) =>
									setStreamForm({
										...streamForm,
										end_date: e.format('YYYY-MM-DD'),
									})
								}
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item>
							<label htmlFor='Input'>SubCategory</label>
							<Input
								name='sub_category'
								placeholder='subcategory'
								value={streamForm.sub_category}
								onChange={(e) =>
									setStreamForm({
										...streamForm,
										sub_category: e.target.value,
									})
								}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Modal>

			{modalEdit ? (
				<ModalDetail
					infoDetail={infoDetail}
					modalEdit={modalEdit}
					keywords={keywords}
					handleKeyword={handleKeyword}
					configKeywordList={configKeywordList}
					handleDeleteKeyword={handleDeleteKeyword}
					setmodalEdit={setmodalEdit}
					setkeywords={setkeywords}
					handleUpdate={handleUpdate}
					setinfoDetail={setinfoDetail}
					loadingKey={loadingKey}
				/>
			) : null}
		</>
	);
};

export default SubCatList;
