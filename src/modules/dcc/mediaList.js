import { Card, Image } from 'components';
import Popchart from 'modules/popup/popchart';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMediaCountArticle } from 'store/actions/summaryActions';
import styles from 'styles/elements/commandMediaList.module.scss';

const MediaList = ({ className, data, ...props }) => {
	const dispatch = useDispatch();
	const summary = useSelector((state) => state.summary);
	const { medCountArticle } = summary;
	const [articleData, setArticleData] = useState({});
	const [modal, setModal] = useState(false);

	const ModalMedia = () => {
		return (
			<Popchart
				modal={{
					title: `Article List (${articleData.name})`,
					visible: modal && !medCountArticle.loading,
					closable: true,
					onCancel: () => {
						setModal(false);
						setArticleData({});
					},
				}}
				onLoading={medCountArticle.loading}
				data={
					medCountArticle.result.data
						? medCountArticle.result.data.data.map((item) => {
								return {
									id: item.article_id,
									title: item.title,
									content: item.content,
									detail: item,
								};
						  })
						: []
				}
				pagination={{
					showSizeChanger: true,
					total: medCountArticle.result.data ? medCountArticle.result.data.recordsTotal : 0,
					showTotal: (total) => `Total ${total} data`,
					defaultPageSize: articleData.size,
					defaultCurrent: articleData.page + 1,
					onChange: (page, pageSize) => {
						dispatch(
							getMediaCountArticle({
								size: pageSize,
								page: page - 1,
								article_ids: articleData.article_ids,
							}),
						);

						setArticleData({
							...articleData,
							page: page - 1,
							size: pageSize,
						});
					},
				}}
			/>
		);
	};

	return (
		<Card className={className} {...props}>
			<div className={styles['media-list-wrapper']}>
				{data.map((icon, index) => {
					return (
						<div
							key={index}
							className={styles['list-item']}
							onClick={() => {
								setArticleData({
									name: icon.label,
									page: 0,
									size: 10,
									article_ids: icon.article_ids,
								});

								dispatch(
									getMediaCountArticle({
										size: 10,
										page: 0,
										article_ids: icon.article_ids,
									}),
								);

								setModal(true);
							}}
						>
							{/* <div className={styles['item-image']}>
								<Image src={icon.url} objectFit='contain' alt='icon' height={30} width={30} priority='true' />
							</div> */}
							<div className={styles['item-total']}>{icon.total}</div>
							<div className={styles['item-label']}>{icon.label}</div>
						</div>
					);
				})}
			</div>
			<ModalMedia />
		</Card>
	);
};

export default MediaList;
