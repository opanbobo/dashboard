import Image from 'next/image';
import styles from 'styles/elements/loading.module.scss';
import loadingbaru from '../../../public/images/loader.gif';


function Loading({ children, type }) {
	switch (type) {
		default: {
			return (
				<div className={styles['loading-wrap']}>
					<div className={styles['child-wrap']}>
						{children == null && (
							<>
								{/* _loading_ */}
								{/* <svg className={styles.logo} viewBox='0 0 130 130' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path d='M0 0V22.8L40 0H0Z' fill='#484F6C' />
									<path d='M90 0.300049V23.1L130 0.300049H90Z' fill='#484F6C' />
									<path d='M40.3 4.19995V50.5L1 27L40.3 4.19995Z' fill='#FF931E' />
									<path d='M40.3 58.3V104.6L1 81.1L40.3 58.3Z' fill='#FF931E' />
									<path d='M84.8 31V77.2L45.5 53.8L84.8 31Z' fill='#484F6C' />
									<path d='M84.8 83.7V130L45.5 106.5L84.8 83.7Z' fill='#77A1B6' />
									<path d='M129.4 58.3V104.6L90 81.1L129.4 58.3Z' fill='#77A1B6' />
									<path d='M90 77.2V31L129.4 54.4L90 77.2Z' fill='#FF931E' />
									<path d='M45.5 50.5V4.19995L84.8 27.7L45.5 50.5Z' fill='#77A1B6' />
									<path d='M0.300049 77.2V31L39.7001 54.4L0.300049 77.2Z' fill='#77A1B6' />
								</svg> */}
								<Image src={loadingbaru} alt="Loading" width={40} height={40}/>
								<div className={styles['child-text']}>Try to get data...</div>
							</>
						)}
					</div>
				</div>
			);
		}
	}
}

// function LoadingChart({ props }) {
// 	return (
// 		<Loading>
// 			loading_chart...
// 			{props.children}
// 		</Loading>
// 	);
// }

// function LoadingWidget({ props }) {
// 	return <Loading {...props}>LoadingWidget....</Loading>;
// }

// export { Loading, LoadingChart, LoadingWidget };

export default Loading;
