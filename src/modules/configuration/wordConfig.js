import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, Fragment } from 'react';

import { Row, Col, Table, ColumnList, Button, Input, Form, Drawer, Popconfirm, Modal, notification } from 'components';
import { createStopword, deleteStopword, getStopwordList, updateStopword } from 'store/actions/stopwordActions';

const WordConfig = () => {
	const dispatch = useDispatch();
	const stopword = useSelector((state) => state.stopword);

	const { stopwordList, stopwordCreate, stopwordDelete, stopwordUpdate } = stopword;

	const [modalEdit, setmodalEdit] = useState(false);
	const [openCreate, setopenCreate] = useState(false);

	const [word, setword] = useState('');
	const [infoDetail, setinfoDetail] = useState({
		stop_word: '',
	});
	const [newStopword, setnewStopword] = useState({
		stop_word: '',
		new_stop_word: '',
	});
	const [addWord, setaddWord] = useState({
		stop_words: '',
	});

	const [wordSelection, setwordSelection] = useState('checkbox');
	const [selectedWord, setselectedWord] = useState([]);

	useEffect(() => {
		dispatch(getStopwordList({ page: 0, size: 20 }));
	}, []);

	const OpenEdit = (id, value) => {
		setmodalEdit(true);
		setinfoDetail({
			stop_word: value,
		});
	};

	const deleteWord = (record) => {
		deleteStopword({
			stop_words: [record],
		})
			.then((data) => data.json())
			.then((data) => {
				notification.success({ message: 'Success add stopword' });

				dispatch(getStopwordList({ page: 0, size: 20 }));
				// setTimeout(() => {
				// }, 2000);
			})
			.catch((err) => notification.error({ message: 'Error when delete stopword!' }));
	};

	const handleInput = (e, type) => {
		const newWord = { ...addWord };
		newWord[type] = e.target.value;
		setaddWord(newWord);
	};

	const submitWord = (e) => {
		createStopword({
			stop_words: [addWord.stop_words],
		})
			.then((data) => data.json())
			.then((data) => {
				notification.success({ message: 'Success add stopword' });
				setaddWord({
					stop_words: '',
				});
				dispatch(getStopwordList({ page: 0, size: 20 }));
				setopenCreate(false);
				// setTimeout(() => {
				// }, 2000);
			})
			.catch((err) => notification.error({ message: 'Error when add stopword!' }));
	};

	const handleUpdate = (e, type) => {
		const updateWord = {
			stop_word: infoDetail.stop_word,
			new_stop_word: newStopword.new_stop_word,
		};
		updateWord[type] = e.target.value;
		setnewStopword(updateWord);
	};

	const submitUpdate = (e) => {
		if (newStopword.new_stop_word.split(' ').length > 1) {
			notification.warn({ message: 'Stopword must only contain one word!' });
		} else {
			updateStopword(newStopword)
				.then((data) => data.json())
				.then((data) => {
					notification.success({ message: 'Success edit stopword' });
					dispatch(getStopwordList({ page: 0, size: 20 }));
					setmodalEdit(false);
					setnewStopword({
						stop_word: '',
						new_stop_word: '',
					});
					// setTimeout(() => {
					// }, 2000);
				})
				.catch((err) => notification.error({ message: 'Error when edit stopword!' }));
		}
	};

	return (
		<>
			<Row style={{ height: '100%' }}>
				<Col span={8}>
					<Button icons='PlusCircleOutlined' type='dashed' onClick={() => setopenCreate(true)}>
						Stopword
					</Button>
				</Col>
				<Col span={24}>
					<Table
						data={stopwordList.result.data}
						rowKey={(record) => {
							return record;
						}}
						pagination={{
							total: stopwordList.result.total,
							showTotal: (total) => `Total ${total} Stopword`,
						}}
						rowSelection={{
							type: wordSelection,
							onChange: (selectedRowKeys, selectedRows) => {
								setselectedWord(selectedRows);
							},
							getCheckboxProps: (record) => ({
								rowKey: record,
							}),
							selectedRowKeys: selectedWord.map((item) => item),
						}}
						column={[
							{
								title: 'Stopword List',
								render: (record) => (
									<Fragment>
										<ColumnList title='Stopword' content={record} />
										<ColumnList title='action' type='action'>
											<Button size='small' icons='EditOutlined' onClick={() => OpenEdit(record, record)} />
											<Popconfirm
												title='Are you sure to delete this?'
												onConfirm={() => deleteWord(record)}
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
								title: 'Stopword',
								key: 'stop_words',
								sorter: (a, b) => a.length - b.length,
								responsive: ['md'],
							},
							{
								title: 'Action',
								key: 'action',
								width: 100,
								align: 'center',
								responsive: ['md'],
								render: (record) => (
									<ColumnList type='action'>
										<Button size='small' icons='EditOutlined' onClick={() => OpenEdit(record, record)} />
										<Popconfirm
											title='Are you sure to delete this?'
											onConfirm={() => deleteWord(record)}
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
				visible={openCreate}
				title='Create Stopword'
				footer={null}
				closable
				onCancel={() => {
					setopenCreate(false);
					setaddWord({
						stop_words: '',
					});
				}}
			>
				<Row align='bottom'>
					<Col span={24}>please input only 1 word</Col>
					<Col span={20}>
						<label htmlFor='Input'>Stop Word</label>
						<Input
							onChange={(e) => handleInput(e, 'stop_words')}
							id='stop_words'
							defaultValue={addWord.stop_words}
							placeholder='stop words'
							suffixIcon='PlusCircleOutlined'
						/>
					</Col>
					<Col span={4}>
						<Button type='primary' block='true' icons='PlusCircleOutlined' onClick={(e) => submitWord(e)} />
					</Col>
				</Row>
			</Modal>
			<Modal
				visible={modalEdit}
				closable
				onCancel={() => {
					setmodalEdit(false);
					setinfoDetail({});
					setnewStopword({
						stop_word: '',
						new_stop_word: '',
					});
				}}
				footer={[
					<Button key='submit' type='primary' onClick={(e) => submitUpdate(e)}>
						Submit
					</Button>,
					<Button
						key='back'
						type='dashed'
						danger='true'
						onClick={() => {
							setmodalEdit(false);
							setinfoDetail({});
							setnewStopword({
								stop_word: '',
								new_stop_word: '',
							});
						}}
					>
						Cancel
					</Button>,
				]}
			>
				<Row>
					<Col span={24}>
						<label htmlFor='input'>Stopword</label>
						<Input onChange={(e) => handleUpdate(e)} id='stop_word' defaultValue={infoDetail.stop_word} disabled />
					</Col>
					<Col span={24}>
						<label htmlFor='input'>New Stopword</label>
						<Input
							onChange={(e) => handleUpdate(e, 'new_stop_word')}
							id='new_stop_word'
							defaultValue={newStopword.new_stop_word}
						/>
					</Col>
				</Row>
			</Modal>
		</>
	);
};

export default WordConfig;
