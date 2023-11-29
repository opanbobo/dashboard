import { useState, useEffect } from 'react';
import { Space as Spaces } from 'antd';
import breakPointOberver from 'constant/mediaQuery';

const breakPoints = {
	phone: '(max-width: 300px)',
	desktop: '(min-width: 1024px)',
};

const Space = ({ children, direction, ...props }) => {
	const [breakPoint, isBreakPoint] = useState();

	useEffect(() => {
		breakPointOberver(breakPoints, isBreakPoint);
	}, [breakPoint]);

	return (
		<Spaces direction={direction == null && breakPoint == 'phone' ? 'vertical' : 'horizontal'} {...props}>
			{children}
		</Spaces>
	);
};

export default Space;
