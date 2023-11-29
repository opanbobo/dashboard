import { Card, Icon, Loading } from 'components';
import styles from 'styles/elements/widget.module.scss';

export default function Widget({ id, label, onLoading = false, description, percent, type, total, status, ...props }) {
	return (
		<Card
			id={id}
			className={`${styles.widget}
				${type == null ? '' : ''} 
        ${type == 'neutral' ? styles.neutral : ''} 
        ${type == 'positive' ? styles.positive : ''} 
        ${type == 'negative' ? styles.negative : ''}
      `}
			{...props}
		>
			{onLoading == true && <Loading />}
			<div className={styles['inner-widget']}>
				<div className={styles['widget-item']}>
					<div className={styles['item-label']}>{label}</div>
				</div>
				<div className={`${styles['widget-item']} ${styles.info}`}>
					<div className={styles['info-total']}>{total}</div>
					<div className={styles['info-icon']}>
						{type == null && <Icon className={styles['icon-status']} type='MessageTwotone' twoToneColor='#484f6c' />}
						{type == 'neutral' && (
							<Icon className={styles['icon-status']} type='MinusCircleTwoTone' twoToneColor='1990ff' />
						)}
						{type == 'positive' && (
							<Icon className={styles['icon-status']} type='PlusCircleTwoTone' twoToneColor='06d6a0' />
						)}
						{type == 'negative' && (
							<Icon className={styles['icon-status']} type='CloseCircleTwoTone' twoToneColor='ff6b6b' />
						)}
					</div>
				</div>
				<div className={styles['widget-item']}>
					<div className={styles['item-description']}>
						{status == 'down' && <Icon className={styles['icon-status']} type='ArrowDownOutlined' />}
						{status == 'up' && <Icon className={styles['icon-status']} type='ArrowUpOutlined' />}
						{status == 'normal' && <Icon className={styles['icon-status']} type='MinusOutlined' />}
						<span className={styles['item-percent']}>{percent}</span>
						<span>{description}</span>
					</div>
				</div>
			</div>
		</Card>
	);
}
