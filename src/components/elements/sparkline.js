import { Card, Icon, ApexChart, Loading } from 'components';
import styles from 'styles/elements/sparkline.module.scss';

const Sparkline = ({
	className,
	onLoading = false,
	title,
	stats,
	type,
	percentage,
	total,
	height = 120,
	charts,
	...props
}) => {
	return (
		<Card className={className} {...props}>
			{onLoading == true && <Loading />}
			<div className={styles['spark-wrapper']}>
				<div className={styles['spark-chart']}>
					<ApexChart id='Sparkline' type={charts.type} height={height} {...charts} />
				</div>
				<div className={styles['spark-info']}>
					<div className={styles['info-title']}>{title}</div>
					<div className={styles['info-stats']}>
						<h5 className={styles['stats-total']}>{total}</h5>
						{/* <div className={styles['stats-sub']}>
							{`${percentage}%`}
							{type == 'up' && (
								<Icon className={styles['icon-sub']} type='CaretUpFilled' style={{ color: '#06d6a0' }} />
							)}
							{type == 'down' && (
								<Icon className={styles['icon-sub']} type='CaretDownOutlined' style={{ color: '#ff6b6b' }} />
							)}
							{type == 'normal' && (
								<Icon className={styles['icon-sub']} type='MinusOutlined' style={{ color: '#1990ff' }} />
							)}
						</div> */}
					</div>
				</div>
			</div>
		</Card>
	);
};

export default Sparkline;
