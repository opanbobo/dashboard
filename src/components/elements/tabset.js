import { Tabs } from 'antd';
import { useState, useEffect } from 'react';
import breakPointOberver from 'constant/mediaQuery';

const TabPane = Tabs.TabPane;

const breakPoints = {
	tablet: ' (max-width: 1023px)',
	desktop: '(min-width: 1024px)',
};

const Tabset = ({ tabPosition, data, ...props }) => {
	const [breakPoint, isBreakPoint] = useState();

	useEffect(() => {
		breakPointOberver(breakPoints, isBreakPoint);
	}, [breakPoint]);

	return (
		<Tabs
			defaultActiveKey='1'
			size='small'
			tabPosition={
				(tabPosition != null && tabPosition) || (tabPosition == null && breakPoint === 'tablet') ? 'top' : 'left'
			}
			{...props}
		>
			{data != null &&
				data.map((panel) => {
					return (
						<TabPane tab={panel.title} key={panel.key}>
							{panel.content}
						</TabPane>
					);
				})}
		</Tabs>
	);
};

export default Tabset;
