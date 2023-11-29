import { Card, Icon, Tooltip } from 'components';

import styles from 'styles/elements/commandMention.module.scss';

const MentionList = ({ className, title, info, data, onLoading, imageStyle, labelStyle, ...props }) => {
	return (
		<Card onLoading={onLoading} className={`${className} ${styles['mention-wrapper']}`} {...props}>
			{title != null && (
				<div className={styles['mention-head']}>
					<div className={styles['head-title']}>
						<span className={styles['title-label']}>{title}</span>
						<Tooltip title={info}>
							<Icon className={styles['title-icon']} type='InfoCircleOutlined' />
						</Tooltip>
					</div>
				</div>
			)}
			<div className={styles['mention-list']}>
				{data.map((item, index) => {
					return (
						<div className={styles['mention-item']} key={index}>
							<Tooltip title={item.label}>
								<div className={styles['item-image']} style={imageStyle}>
									{item.image}
								</div>
								<div className={styles['item-label']} style={labelStyle}>
									{item.label}
								</div>
							</Tooltip>
						</div>
					);
				})}
			</div>
		</Card>
	);
};

export default MentionList;
