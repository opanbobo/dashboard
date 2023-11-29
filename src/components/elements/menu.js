import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, useState, useEffect } from 'react';
import { Button, Image, Tooltip } from 'components';
// import { Tooltip } from 'antd';
import styles from 'styles/elements/menu.module.scss';

import breakPointOberver from 'constant/mediaQuery';

const breakPoints = {
	tablet: '(min-width: 300px) and (max-width: 1023px)',
};

const ButtonMenu = forwardRef(function ButtonMenu(props, ref) {
	return <Button {...props} />;
});

const Menu = ({ className, feature, data, logo, ...props }) => {
	const router = useRouter();

	const [breakPoint, setbreakPoint] = useState();

	useEffect(() => {
		breakPointOberver(breakPoints, setbreakPoint);
	}, [breakPoint]);

	return (
		<div className={`${styles['menu-wrapper']} ${className}`} {...props}>
			<div className={styles['menu-head']}>
				<div className={styles['head-item']}>
					<Image src={logo} objectFit='cover' alt='headLogo' height={40} width={40} priority='true' />
				</div>
			</div>
			<div className={styles['menu-feature']}>
				{feature.map((item, index) => {
					return (
						<Tooltip key={index} title={item.label} placement='right'>
							<div className={styles['feature-item']}>
								<Link href={item.link} passHref>
									<ButtonMenu
										className={`${styles['feature-button']} ${item.link}`}
										style={{
											background:
												router.pathname == item.link
													? '#4b79be'
													: '' || item.id == 1
													? '#77a1b8'
													: '#ff6b6b' && item.id == 2
													? '#494e6d'
													: '#ff941d' && item.id == 3
													? '#ff941d'
													: '#1990ff',
											color: router.pathname == item.link ? '#fff' : '' || item.id ? '#fff' : '',
										}}
										type={router.pathname == item.link ? 'primary' : 'ghost'}
										icons={item.icon}
									/>
								</Link>
							</div>
						</Tooltip>
					);
				})}
			</div>
			<div className={styles['menu-list']}>
				{data.map((item, index) => {
					return (
						<Tooltip key={index} title={item.label} placement='right'>
							<div className={styles['menu-item']}>
								<Link href={item.link} passHref>
									<ButtonMenu
										className={`${styles['menu-button']}`}
										style={{
											background:
												router.pathname == item.link ? '#4b79be' : '' || breakPoint == 'tablet' ? '#f2f2f7' : '',
											color: router.pathname == item.link ? '#fff' : '',
										}}
										type={router.pathname == item.link ? 'primary' : 'ghost'}
										icons={item.icon}
										size={breakPoint == 'tablet' ? 'default' : 'small'}
									/>
								</Link>
							</div>
						</Tooltip>
					);
				})}
			</div>
			{/* <div className={styles['menu-foot']}>
				<div className={styles['foot-item']}>foot</div>
			</div> */}
		</div>
	);
};

export default Menu;
