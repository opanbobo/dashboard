import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import FileBase64 from 'react-file-base64';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

import { Row, Col, Form, Input, Radio, Checkbox, Button, notification } from 'components';
import { Divider } from 'antd';

import { getConnectMedia, postConnect } from 'store/actions/connectActions';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const radioOptions = [
	{ value: 'National', label: 'National' },
	{ value: 'Business', label: 'Business' },
	{ value: 'Legal', label: 'Legal' },
];

const MediaSelect = ({ group, options, setupload, upload, indeterminate, connectMediaList, ...props }) => {
	const onChange = (list) => {
		setupload({
			...upload,
			media_names: list,
		});
	};

	const onCheckAllChange = (e) => {
		e.target.checked
			? setupload({
					...upload,
					media_names: connectMediaList.result.results.map((e) => e.media_name),
				})
			: setupload({
					...upload,
					media_names: [],
				});
	};

	return (
		<>
			<Checkbox
				indeterminate={indeterminate}
				onChange={onCheckAllChange}
				checked={upload.media_names.length == connectMediaList.result.results?.length}
				{...props}
			>
				Select all
			</Checkbox>
			<Divider style={{ margin: '6px 0' }} />
			<Checkbox
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					flexDirection: 'column',
					height: 200,
					width: '100%',
					overflow: 'auto',
				}}
				type='group'
				options={options}
				value={upload.media_names}
				id='media_names'
				onChange={onChange}
				{...group}
			/>
		</>
	);
};

const Connect = () => {
	const dispatch = useDispatch();
	const [checkedList, setCheckedList] = useState();
	const [indeterminate, setIndeterminate] = useState(true);
	const [checkAll, setCheckAll] = useState(false);

	const connect = useSelector((state) => state.connect);
	const { connectMediaList, connectUpload } = connect;

	const [openCC, setopenCC] = useState(false);
	const [upload, setupload] = useState({
		headline: '',
		subline: '',
		client_email: '',
		content: '',
		editorial_desk: '',
		media_names: [],
		images: [
		],
	});

	useEffect(() => {
		dispatch(getConnectMedia());
	}, []);

	const getFiles = (files) => {
		return JSON.stringify(files);
	};

	const getEditorial = (e) => {
		setupload({
			...upload,
			editorial_desk: e.target.value,
		});
	};

	const uploadMessage = () => {
		// console.log(value);
		const uploadInp = upload.client_email ? upload : {
			headline: upload.headline,
			subline: upload.subline,
			content: upload.content,
			editorial_desk: upload.editorial_desk,
			media_names: upload.media_names,
			images: upload.images,
		};

		postConnect(uploadInp)
			.then((data) => data.json())
			.then((data) => {
				if (data.message) {
					notification.success({
						message: data.message,
						description: upload.headline,
					});
				} else {
					let temp = [];
					for (const key in data) {
						temp.push(key)
					}

					notification.error({
						message: temp.join(", ") + " error",
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// const MediaSelect = ({ group, options, ...props }) => {
	// 	const selectedMedia = useState([]);

	// 	const onChange = (list) => {
	// 		setupload({
	// 			...upload,
	// 			media_names: list,
	// 		});
	// 	};

	// 	const onCheckAllChange = (e) => {
	// 		e.target.checked
	// 			? setupload({
	// 					...upload,
	// 					media_names: connectMediaList.result.results.map((e) => e.media_name),
	// 			  })
	// 			: setupload({
	// 					...upload,
	// 					media_names: [],
	// 			  });
	// 	};

	// 	return (
	// 		<>
	// 			<Checkbox
	// 				indeterminate={indeterminate}
	// 				onChange={onCheckAllChange}
	// 				checked={upload.media_names.length == connectMediaList.result.results?.length}
	// 				{...props}
	// 			>
	// 				Select all
	// 			</Checkbox>
	// 			<Divider style={{ margin: '6px 0' }} />
	// 			<Checkbox
	// 				style={{
	// 					display: 'flex',
	// 					alignItems: 'flex-start',
	// 					flexDirection: 'column',
	// 					height: 200,
	// 					width: '100%',
	// 					overflow: 'auto',
	// 				}}
	// 				type='group'
	// 				options={options}
	// 				value={upload.media_names}
	// 				id='media_names'
	// 				onChange={onChange}
	// 				{...group}
	// 			/>
	// 		</>
	// 	);
	// };

	return (
		<Form form>
			<Row>
				<Col span={24}>
					<Row>
						<Col span={12} className="text-black">
							<Form.Item>
								<label htmlFor='headline'>Headline</label>
								<Input
									id='headline'
									addonAfter={
										<span style={{ cursor: 'pointer' }} onClick={() => setopenCC(!openCC)}>
											cc
										</span>
									}
									onChange={(e) =>
										setupload({
											...upload,
											headline: e.target.value,
										})
									}
									value={upload.headline}
									placeholder='headline'
								/>
							</Form.Item>
							{openCC ? (
								<Form.Item>
									<label htmlFor='client_email'>CC</label>
									<Input
										suffixIcon='InfoCircleOutlined'
										tooltips='only include 1 e-mail address'
										id='client_email'
										onChange={(e) =>
											setupload({
												...upload,
												client_email: e.target.value,
											})
										}
										value={upload.client_email}
										placeholder=''
									/>
								</Form.Item>
							) : null}

							<Form.Item>
								<label htmlFor='subline'>Subline</label>
								<Input
									id='subline'
									onChange={(e) =>
										setupload({
											...upload,
											subline: e.target.value,
										})
									}
									value={upload.subline}
									placeholder='subline'
								/>
							</Form.Item>
							<Form.Item>
								<label htmlFor='radio'>Editor Desk</label>
								<Radio
									type='group'
									optionType='button'
									name={upload.editorial_desk}
									onChange={(e) => getEditorial(e)}
									id='editorial_desk'
									style={{ width: '100%' }}
								>
									{radioOptions.map((item) => {
										return (
											<Radio key={item.value} value={item.value}>
												{item.label}
											</Radio>
										);
									})}
								</Radio>
							</Form.Item>
							<Form.Item>
								<label htmlFor='radio'>Picture Upload</label>
								<FileBase64
									id='images'
									multiple={true}
									onDone={(e) =>
										setupload({
											...upload,
											images: [
												...upload.images,
												{
													filename: JSON.parse(getFiles(e))[0].name,
													base64: JSON.parse(getFiles(e))[0].base64,
												},
											],
										})
									}
								/>
							</Form.Item>
						</Col>
						<Col span={12} className="text-black">
							<Form.Item>
								<label htmlFor='radio'>Media Select</label>
								<MediaSelect
									upload={upload}
									connectMediaList={connectMediaList}
									style={{ width: '100%' }}
									id='media_names'
									value={upload.media_names}
									setupload={setupload}
									indeterminate={indeterminate}
									options={
										connectMediaList.result.results
											? connectMediaList.result.results
													.sort((a, b) => (a.media_name > b.media_name ? 1 : -1))
													.map((item, idx) => {
														return {
															label: item.media_name,
															value: item.media_name,
														};
													})
											: []
									}
								/>
							</Form.Item>
						</Col>
					</Row>
				</Col>
				<Col span={24} className="text-black">
					<Form.Item>
						<label htmlFor='radio'>Content</label>
						{/* <ReactQuill theme="snow" defaultValue={upload.content} onChange={(e) =>
								setupload({
									...upload,
									content: e.target.value,
								})}/> */}
						<Input
							type='textarea'
							id='content'
							rows={8}
							defaultValue={upload.content}
							onChange={(e) =>
								setupload({
									...upload,
									content: e.target.value,
								})
							}
						/>
					</Form.Item>
				</Col>
				<Col xs={24} md={4} lg={4} xl={2}>
					<Form.Item>
						<Button type='primary' block='true' htmlType='submit' onClick={() => {
							uploadMessage()
						}}>
							Send Email
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default Connect;
