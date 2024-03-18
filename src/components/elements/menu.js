import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, useState, useEffect } from 'react';
import { Button, Tooltip } from 'components';
import { notification, Collapse} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
// import { Tooltip } from 'antd';
import styles from 'styles/elements/menu.module.scss';
import Image from 'next/image';

const { Panel } = Collapse;

import breakPointOberver from 'constant/mediaQuery';
import logotai from '../../../public/images/ivo.png';

const breakPoints = {
	tablet: '(min-width: 300px) and (max-width: 1023px)',
};

const ButtonMenu = forwardRef(function ButtonMenu(props, ref) {
	return <Button {...props} />;
});

const Menu = ({ className, feature, data, logo, onClick, ...props }) => {
	const router = useRouter();

	const [breakPoint, setbreakPoint] = useState();

	// const handleMenuClick = (item) => {
  //   // Fungsi yang akan dipanggil saat menu diklik
  //   console.log('Menu clicked:', item);
  //   // Tambahkan logika navigasi atau yang diinginkan saat menu diklik
  // };

	useEffect(() => {
		breakPointOberver(breakPoints, setbreakPoint);
	}, [breakPoint]);

  const handleLogout = async () => {
    localStorage.clear();
		notification.info({
			message: 'Thank you for using Conventional Media Dashboard',
		});
    router.push("/login");
  };

	return (
		<div className={`${styles['menu-wrapper']} ${className}`} {...props}>
			<div className={styles['menu-head']}>
				<div className={styles['head-item']}>
					<Image src={logo} objectFit='cover' alt='headLogo' height={100} width={100} priority='true' />
				</div>
        <CloseOutlined className={styles["close-menu"]} onClick={onClick}/>
			</div>
			<Collapse accordion className='dashboard-menux'>
				<Panel header="Dashboard Menu" key="1">
					<div className={styles['menu-feature']}>
						{feature.map((item, index) => {
							return (
								<div key={index} title={item.text} placement='right'>
									<Link href={item.link} passHref>
										<a className={`${styles['feature-item']} mn ${router.pathname === item.link ? styles['menu-active'] : ''}`}>
											<span className={`${styles['ant-menu-submenu-title']}`}>
												<>
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
													{item.text}
												</>
											</span>
										</a>
									</Link>
								</div>
							);
						})}
					</div>
				</Panel>
			</Collapse>
			<div className={styles['menu-feature']}>
				{data.map((item, index) => {
					return (
						<div key={index} title={item.text} placement='right'>
							<Link href={item.link} passHref>
								<a className={`${styles['feature-item']} mn ${router.pathname === item.link ? styles['menu-active'] : ''}`}>
									<span className={`${styles['ant-menu-submenu-title']}`}>
											<>
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
												{item.text}
											</>
									</span>
								</a>
							</Link>
						</div>
					);
				})}
			</div>
			
			<div className={styles['menu-feature']}>
				<div placement='right'>
					<a className={`${styles['feature-item']} ant-menu-submenu-inline`} onClick={handleLogout}>
						<span className={`${styles['ant-menu-submenu-title']}`}>
							<>
								<ButtonMenu
									className={`${styles['feature-button']}`}
									style={{
										color: '#fff',
									}}
									icons="LogoutOutlined"
								/>
								Logout
							</>
						</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Menu;
