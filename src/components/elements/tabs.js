import React, { useState, useEffect, forwardRef } from 'react';

import { Button, Card } from 'components';
import styles from 'styles/elements/tabset.module.scss';

const TabButton = forwardRef(function TabButton(props, ref) {
	return <Button {...props}>{props.children}</Button>;
});

const Tab = ({ children, active = 0 }) => {
	const [activeTab, setactiveTab] = useState(active);
	const [tabsData, settabsData] = useState([]);

	useEffect(() => {
		let data = [];
		React.Children.forEach(children, (element) => {
			if (!React.isValidElement(element)) return;

			const {
				props: { tab, children },
			} = element;
			data.push({ children, tab });
		});
		settabsData(data);
	}, [children]);

	return (
		<Card>
			<div className={styles['tab-wrapper']}>
				<div className={styles['tab-nav']}>
					{tabsData.map(({ tab }, index) => {
						return (
							<div
								key={index}
								className={`${styles['nav-item']} ${styles[index == activeTab ? 'active' : '']}`}
								onClick={() => setactiveTab(index)}
							>
								<div className={styles['item-button']}>{tab}</div>
							</div>
						);
					})}
				</div>
				<div className={styles['tab-content']}>{tabsData[activeTab] && tabsData[activeTab].children}</div>
			</div>
		</Card>
	);
};

const TabPane = ({ children }) => {
	return { children };
};

Tab.Panel = TabPane;

export default Tab;
