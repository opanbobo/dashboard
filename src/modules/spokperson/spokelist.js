import styles from 'styles/elements/commandMention.module.scss';
import { Card, Icon, Image } from 'components';

const SpokeList = ({ className, title, data, ...props }) => {
	return (
		<Card className={`${className} ${styles['mention-wrapper-spoke']}`} {...props}>
			{title != null && (
				<div className={styles['mention-head']}>
					<div className={styles['head-title']}>
						<span className={styles['title-label']}>{title}</span>
					</div>
				</div>
			)}
			<div className={styles['mention-list']}>
				{data.map((item, index) => {
					return (
						<div className={styles['mention-item']} key={index}>
							<div className={styles['item-image']}>
								<Image
									src={item.image}
									layout='fill'
									objectFit='contain'
									alt='headLogo'
									height={120}
									width={120}
									priority='true'
								/>
							</div>
							<div className={styles['item-info']}>
								<div className={styles['item-label']}>{item.label}</div>
								{item.news != null && <div className={styles['item-content']}>{item.news}</div>}
							</div>
						</div>
					);
				})}
			</div>
		</Card>
	);
};

export default SpokeList;
