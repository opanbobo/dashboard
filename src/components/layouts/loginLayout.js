import styles from 'styles/layout/login.module.scss';
import { MainHeader, Image } from 'components';

import Logos from 'assets/images/logo-icon.png';
import LogoArta from 'assets/images/asp.png';
import Tirto from 'assets/images/tirto.png';
import vector from 'assets/images/vectorLogin.png';
import { useMemo } from 'react';

const LoginLayout = ({ children, logo }) => {
	const logoType = useMemo(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

		return origin === "https://ojk.media-insight.id" ? LogoArta : origin === "mock" ? Tirto : vector
  }, []);

	return (
		<div className={styles['layout-auth']}>
			<div className={styles['auth-head']}>
				<MainHeader logo={logoType == LogoArta ? logoType : logo} loginHeader />
			</div>
			<div className={styles.content}>
				<div className={styles.left}>
					<div className={styles['box-form']}>
						<div className={styles['form-title']}>
							<div className={styles['subtitle-text']}>Welcome to,</div>
							<div className={styles['title-text']}>Formal Media Dashboard</div>
							<div className={styles['subtitle-text']}>News - Information - Insight</div>
						</div>
						{children}
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles['vector-wrap']}>
						<Image
							src={logoType}
							layout='fill'
							objectFit='contain'
							height={200}
							width={200}
							alt='vector'
							priority='true'
						/>
					</div>
				</div>
			</div>
			<div className={styles['auth-foot']}>
				<div className={styles['inner-foot']}>
					<div className={styles.logo}>
						<div className={styles.img}></div>
						{/* <img src={Logos} alt='bottom_logo' /> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginLayout;
