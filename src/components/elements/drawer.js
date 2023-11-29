import { useState, useEffect } from 'react';
import { Drawer as Drawers } from 'antd';
import { Icon } from 'components';
import breakPointOberver from 'constant/mediaQuery';

const breakPoints = {
	phone: '(max-width: 600px)',
	tablet: '(max-width: 1023px)',
	desktop: '(min-width: 1024px)',
};

const Drawer = ({ className, children, ...props }) => {
	const [breakPoint, isBreakPoint] = useState();

	useEffect(() => {
		breakPointOberver(breakPoints, isBreakPoint);
	}, [breakPoint]);

	return (
		<Drawers
			className={className}
			closeIcon={<Icon type='CloseSquareTwoTone' twoToneColor='ff6b6b' />}
			headerStyle={{
				// background: 'rgba(74, 119, 186, 0.3)',
				padding: '1rem 12px',
			}}
			bodyStyle={{
				padding: breakPoint == 'mobile' ? 8 : '8px 12px',
			}}
			width={
				breakPoint == 'desktop'
					? 600
					: '50%' || breakPoint == 'phone'
					? '100vw'
					: '50vw' && breakPoint == 'tablet'
					? '50vw'
					: 668
			}
			{...props}
		>
			{children}
		</Drawers>
	);
};

export default Drawer;
